import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserInfo = ({ displayName, photoURL }) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    });
  };

  const verifyEmail = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/dashboard`,
      handleCodeInApp: true,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    setUser,
    createUser,
    signIn,
    logOut,
    loading,
    setLoading,
    updateUserInfo,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
