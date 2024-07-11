// firebaseauth.js
import React, { createContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";

// Function to passsword reset for a user

export const passwordReset = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    throw error;
  }
};

// Function to sign in a user
export const signIn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );
    // User signed in successfully
    console.log("User signed in successfully:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
