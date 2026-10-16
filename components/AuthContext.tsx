"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authRedirectPath, setAuthRedirectPath] = useState<string | null>(null);
  const router = useRouter();

  // Load local session or verify admin/user
  useEffect(() => {
    const localUser = localStorage.getItem("os_active_user") || localStorage.getItem("os_demo_user");
    if (localUser) {
      try {
        setUser(JSON.parse(localUser));
        setLoading(false);
      } catch (e) {
        localStorage.removeItem("os_active_user");
        localStorage.removeItem("os_demo_user");
      }
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const userObj: CustomUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split("@")[0] : "Member"),
            role: "user",
          };
          setUser(userObj);
          localStorage.setItem("os_active_user", JSON.stringify(userObj));
        } else if (!localStorage.getItem("os_active_user") && !localStorage.getItem("os_demo_user")) {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const openAuthModal = (mode: "signin" | "signup" = "signin", redirectPath?: string) => {
    setAuthMode(mode);
    if (redirectPath) setAuthRedirectPath(redirectPath);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const checkRedirect = (defaultPath = "/") => {
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

    setUser(data.user);
    localStorage.setItem("os_active_user", JSON.stringify(data.user));
    closeAuthModal();

    if (data.role === "admin") {
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

    setUser(data.user);
    localStorage.setItem("os_active_user", JSON.stringify(data.user));
    closeAuthModal();

    if (data.role === "admin") {
      router.push("/admin");
    } else {
      checkRedirect(data.redirectTo || "/");
    }

    return { role: data.role, redirectTo: data.redirectTo };
  };

  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      closeAuthModal();
      checkRedirect("/");
    } catch (error) {
      // Mock Google sign-in fallback
      const googleMock: CustomUser = {
        uid: "google-usr-001",
        email: "user@officium.academy",
        displayName: "Academy Member",
        role: "user",
      };
      setUser(googleMock);
      localStorage.setItem("os_active_user", JSON.stringify(googleMock));
      closeAuthModal();
      checkRedirect("/");
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
    closeAuthModal();
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
