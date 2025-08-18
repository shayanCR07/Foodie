import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create an account
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //signup with gmail
  const signUpWithgmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //login using email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //LogOut
  const logOut = () => {
    signOut(auth);
  };

  //update user profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // check signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        // User is signed out
        // ...
      }
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    signUpWithgmail,
    login,
    updateUserProfile,
    logOut,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
