"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { 
  auth, 
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from "@/lib/firebase";
import { useRouter } from "next/navigation";

export interface CustomUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "admin" | "user" | "cadet" | "scholar" | "junior" | "parent";
  rollNumber?: string;
  isDemo?: boolean;
}

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authMode: "signin" | "signup";
  setAuthMode: (mode: "signin" | "signup") => void;
  authRedirectPath: string | null;
  openAuthModal: (mode?: "signin" | "signup", redirectPath?: string) => void;
  closeAuthModal: () => void;
  signInEmail: (email: string, pass: string) => Promise<{ role: string; redirectTo: string }>;
  signUpEmail: (email: string, pass: string, name: string) => Promise<{ role: string; redirectTo: string }>;
  signInGoogle: () => Promise<void>;
  loginDemo: (role?: "cadet" | "scholar" | "parent") => void;
  logout: () => Promise<void>;
  /**
   * Runs `action` immediately for signed-in users. For guests it opens the
   * login popup and replays `action` right after a successful sign-in
   * (the user stays on the current page).
   */
  requireAuth: (action?: () => void, mode?: "signin" | "signup") => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authRedirectPath, setAuthRedirectPath] = useState<string | null>(null);
  const router = useRouter();
  // Action blocked behind login (e.g. open a resource folder / orientation form)
  const pendingActionRef = useRef<(() => void) | null>(null);
  const isGoogleSigningInRef = useRef(false);

  // Helper to detect mobile browsers
  const isMobileDevice = useCallback(() => {
    if (typeof window === "undefined" || !navigator) return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  // Helper to format friendly user errors
  const formatGoogleAuthError = useCallback((error: any) => {
    const code = error?.code || "";
    switch (code) {
      case "auth/operation-not-allowed":
        return "Google Sign-In is not enabled yet in your Firebase Project. Please enable Google under Firebase Console > Authentication > Sign-in method, or sign in using your Email & Password.";
      case "auth/unauthorized-domain":
        const currentHost = typeof window !== "undefined" ? window.location.hostname : "this domain";
        return `Domain '${currentHost}' is not authorized in Firebase Console. Please add it to Firebase Console > Authentication > Settings > Authorized Domains.`;
      case "auth/popup-blocked":
        return "Popup was blocked by your browser. Please allow popups or use the redirect method.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";
      case "auth/account-exists-with-different-credential":
        return "An account already exists with the same email using a different login method. Please sign in with email and password.";
      case "auth/invalid-api-key":
        return "Invalid Firebase API configuration. Please verify environment keys.";
      case "auth/network-request-failed":
        return "Network connection failed. Please check your internet connection.";
      default:
        return error?.message || "Google sign-in could not be completed. Please try again.";
    }
  }, []);

  // Synchronize authenticated Firebase user profile with backend
  const syncFirebaseUser = useCallback(
    async (firebaseUser: FirebaseUser, provider = "google.com") => {
      try {
        const idToken = await firebaseUser.getIdToken();
        const res = await fetch("/api/auth/google-sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken,
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split("@")[0] : "Cadet"),
            provider,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to synchronize profile.");
        }

        if (data.token) {
          localStorage.setItem("os_admin_token", data.token);
        }

        setUser(data.user);
        localStorage.setItem("os_active_user", JSON.stringify(data.user));
        setIsAuthModalOpen(false);

        if (data.role === "admin") {
          pendingActionRef.current = null;
          router.push("/admin");
        } else {
          checkRedirect(data.redirectTo || "/");
        }
        return data;
      } catch (err: any) {
        console.error("Profile sync error:", err);
        throw err;
      }
    },
    [router]
  );

  // Load local session or verify admin/user & handle redirect results
  useEffect(() => {
    let isMounted = true;

    const localUser = localStorage.getItem("os_active_user") || localStorage.getItem("os_demo_user");
    if (localUser) {
      try {
        const parsed = JSON.parse(localUser);
        // Automatically purge any stale mock cadet sessions
        if (parsed.email === "cadet@officium.academy" && (parsed.uid?.startsWith("google-usr-") || !parsed.uid)) {
          localStorage.removeItem("os_active_user");
          localStorage.removeItem("os_demo_user");
          setUser(null);
        } else {
          setUser(parsed);
        }
        setLoading(false);
      } catch (e) {
        localStorage.removeItem("os_active_user");
        localStorage.removeItem("os_demo_user");
      }
    }

    try {
      if (auth) {
        // Handle redirect result from Google sign-in (critical for mobile browsers)
        import("@/lib/firebase").then(({ getRedirectResult }) => {
          if (auth) {
            getRedirectResult(auth)
              .then(async (result) => {
                if (!isMounted) return;
                const wasPending = sessionStorage.getItem("os_auth_pending_redirect");
                if (result?.user) {
                  sessionStorage.removeItem("os_auth_pending_redirect");
                  const redirectPath = sessionStorage.getItem("os_auth_redirect_target");
                  sessionStorage.removeItem("os_auth_redirect_target");
                  if (redirectPath) setAuthRedirectPath(redirectPath);
                  await syncFirebaseUser(result.user, "google.com");
                } else if (wasPending) {
                  sessionStorage.removeItem("os_auth_pending_redirect");
                }
              })
              .catch((err) => {
                console.error("Google redirect result error:", err);
                sessionStorage.removeItem("os_auth_pending_redirect");
              });
          }
        });

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
          if (!isMounted) return;
          if (firebaseUser) {
            const stored = localStorage.getItem("os_active_user");
            if (!stored) {
              try {
                await syncFirebaseUser(firebaseUser, "google.com");
              } catch (e) {
                const userObj: CustomUser = {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split("@")[0] : "Cadet"),
                  role: "user",
                };
                setUser(userObj);
                localStorage.setItem("os_active_user", JSON.stringify(userObj));
              }
            }
          } else if (!localStorage.getItem("os_active_user") && !localStorage.getItem("os_demo_user")) {
            setUser(null);
          }
          setLoading(false);
        });

        return () => {
          isMounted = false;
          unsubscribe();
        };
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  }, [syncFirebaseUser]);

  const openAuthModal = (mode: "signin" | "signup" = "signin", redirectPath?: string) => {
    pendingActionRef.current = null;
    setAuthMode(mode);
    if (redirectPath) setAuthRedirectPath(redirectPath);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Closed by the user without signing in: forget the blocked action
  const dismissAuthModal = () => {
    pendingActionRef.current = null;
    setIsAuthModalOpen(false);
  };

  const requireAuth = useCallback(
    (action?: () => void, mode: "signin" | "signup" = "signin") => {
      if (user) {
        action?.();
        return true;
      }
      pendingActionRef.current = action || null;
      setAuthMode(mode);
      setIsAuthModalOpen(true);
      return false;
    },
    [user]
  );

  const checkRedirect = (defaultPath = "/") => {
    // If the user signed in to unlock something on the current page,
    // stay here and run that action instead of navigating away.
    const pending = pendingActionRef.current;
    if (pending) {
      pendingActionRef.current = null;
      setAuthRedirectPath(null);
      // Let the auth state commit before replaying the action
      setTimeout(pending, 0);
      return;
    }
    const target = authRedirectPath || defaultPath;
    setAuthRedirectPath(null);
    router.push(target);
  };

  const signInEmail = async (email: string, pass: string) => {
    const res = await fetch("/api/auth/unified", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass, isSignUp: false }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Authentication failed. Please check credentials.");
    }

    if (data.token) {
      localStorage.setItem("os_admin_token", data.token);
    }

    // Optional Firebase Client Sync
    try {
      if (auth) {
        await signInWithEmailAndPassword(auth, email, pass);
      }
    } catch (fbErr) {
      // Server unified auth is source of truth
    }

    setUser(data.user);
    localStorage.setItem("os_active_user", JSON.stringify(data.user));
    setIsAuthModalOpen(false);

    if (data.role === "admin") {
      pendingActionRef.current = null;
      router.push("/admin");
    } else {
      checkRedirect(data.redirectTo || "/");
    }

    return { role: data.role, redirectTo: data.redirectTo };
  };

  const signUpEmail = async (email: string, pass: string, name: string) => {
    const res = await fetch("/api/auth/unified", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass, name, isSignUp: true }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Registration failed. Please check credentials.");
    }

    if (data.token) {
      localStorage.setItem("os_admin_token", data.token);
    }

    // Optional Firebase Client Sync
    try {
      if (auth) {
        await createUserWithEmailAndPassword(auth, email, pass);
      }
    } catch (fbErr) {
      // Server unified auth is source of truth
    }

    setUser(data.user);
    localStorage.setItem("os_active_user", JSON.stringify(data.user));
    setIsAuthModalOpen(false);

    if (data.role === "admin") {
      pendingActionRef.current = null;
      router.push("/admin");
    } else {
      checkRedirect(data.redirectTo || "/");
    }

    return { role: data.role, redirectTo: data.redirectTo };
  };

  const signInGoogle = async () => {
    if (isGoogleSigningInRef.current) return;
    if (!auth || !googleProvider) {
      throw new Error("Google authentication is initializing. Please try again in a moment.");
    }

    isGoogleSigningInRef.current = true;

    try {
      const isMobile = isMobileDevice();

      if (isMobile) {
        // Mobile browsers: execute redirect-based flow to avoid popup blocking
        sessionStorage.setItem("os_auth_pending_redirect", "true");
        if (authRedirectPath) {
          sessionStorage.setItem("os_auth_redirect_target", authRedirectPath);
        }
        const { signInWithRedirect } = await import("@/lib/firebase");
        await signInWithRedirect(auth, googleProvider);
        return;
      }

      // Desktop browsers: attempt popup, fallback to redirect if blocked
      try {
        const result = await signInWithPopup(auth, googleProvider);
        if (result?.user) {
          try {
            await syncFirebaseUser(result.user, "google.com");
          } catch (syncErr: any) {
            console.warn("Backend profile sync notice:", syncErr?.message);
            // Google authentication succeeded! Fall back to client session if backend sync had an issue
            const userObj: CustomUser = {
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName || (result.user.email ? result.user.email.split("@")[0] : "Cadet"),
              role: "user",
            };
            setUser(userObj);
            localStorage.setItem("os_active_user", JSON.stringify(userObj));
            setIsAuthModalOpen(false);
            checkRedirect("/");
          }
          return;
        }
      } catch (popupError: any) {
        if (popupError?.code === "auth/popup-blocked") {
          // Fallback to redirect when popup is blocked
          sessionStorage.setItem("os_auth_pending_redirect", "true");
          if (authRedirectPath) {
            sessionStorage.setItem("os_auth_redirect_target", authRedirectPath);
          }
          const { signInWithRedirect } = await import("@/lib/firebase");
          await signInWithRedirect(auth, googleProvider);
          return;
        }
        if (popupError?.code === "auth/popup-closed-by-user") {
          return; // User cancelled without error
        }
        throw popupError;
      }
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      throw new Error(formatGoogleAuthError(error));
    } finally {
      isGoogleSigningInRef.current = false;
    }
  };

  const loginDemo = (role: "cadet" | "scholar" | "parent" = "cadet") => {
    const demoUser: CustomUser = {
      uid: "demo-usr",
      email: "user@officium.academy",
      displayName: "Academy Member",
      role: "user",
      isDemo: true,
    };
    setUser(demoUser);
    localStorage.setItem("os_active_user", JSON.stringify(demoUser));
    setIsAuthModalOpen(false);
    checkRedirect("/");
  };

  const logout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch (e) {}
    try {
      await firebaseSignOut(auth);
    } catch (e) {}
    localStorage.removeItem("os_active_user");
    localStorage.removeItem("os_demo_user");
    localStorage.removeItem("os_admin_token");
    setUser(null);
    router.push("/");
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        authRedirectPath,
        openAuthModal,
        closeAuthModal,
        signInEmail,
        signUpEmail,
        signInGoogle,
        loginDemo,
        logout,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
