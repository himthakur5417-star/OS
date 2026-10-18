import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  browserLocalPersistence,
  setPersistence,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCjC7CXHnESi9GBXNrxiN2PkLLVne-w3k4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "os-web-1cc80.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "os-web-1cc80",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "os-web-1cc80.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "754661334425",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:754661334425:web:0279cb6123fa8dc4974708",
};

// Safe lazy getter functions (prevents lexical TDZ and SSR crashes)
export function getFirebaseApp() {
  try {
    return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  } catch (e) {
    console.warn("Firebase App init warning:", e);
    return null;
  }
}

export function getFirebaseAuth() {
  try {
    const a = getFirebaseApp();
    if (!a) return null;
    const aAuth = getAuth(a);
    if (typeof window !== "undefined") {
      setPersistence(aAuth, browserLocalPersistence).catch(() => {});
    }
    return aAuth;
  } catch (e) {
    console.warn("Firebase Auth init warning:", e);
    return null;
  }
}

export function getFirestoreDb(): Firestore | null {
  try {
    const a = getFirebaseApp();
    return a ? getFirestore(a) : null;
  } catch (e) {
    console.warn("Firestore init warning:", e);
    return null;
  }
}

export function getGoogleProvider() {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    provider.addScope("email");
    provider.addScope("profile");
    return provider;
  } catch (e) {
    return null;
  }
}

// Client-side instances
var auth: any = null;
var googleProvider: any = null;
var app: any = null;
var db: any = null;

if (typeof window !== "undefined") {
  try {
    app = getFirebaseApp();
    auth = getFirebaseAuth();
    googleProvider = getGoogleProvider();
    db = getFirestoreDb();
  } catch (e) {
    console.warn("Firebase client fallback:", e);
  }
}

export {
  app,
  auth,
  db,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  type User
};
