import { createContext, useEffect, useState } from "react";
import {
  authenticateAnonymously,
  onAuthStateChanged,
  signOut,
} from "./firestore";

export const AuthContext = createContext();

export const useAuth = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const signIn = async () => {
      try {
        const user = await authenticateAnonymously();
        setUser(user);
      } catch (e) {
        console.error("Failed to log in because:", e.message);
      }
    };

    signIn();
  }, []);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  const logOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.error("Failed to log out because:", e.message);
    }
  };

  return {
    logOut,
    user,
  };
};
