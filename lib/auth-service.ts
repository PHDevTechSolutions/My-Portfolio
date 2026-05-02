import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// Sign in with email and password
export async function signIn(email: string, password: string): Promise<AuthUser> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}

// Sign out
export async function logOut(): Promise<void> {
  await signOut(auth);
}

// Get current user
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Listen to auth state changes
export function onAuthChange(callback: (user: AuthUser | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    } else {
      callback(null);
    }
  });
}
