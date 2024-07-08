// firebaseauth.js
import React, { createContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";

// Function to sign up a user
export const signUp = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    // User signed up successfully
    console.log("User signed up successfully:", userCredential.user);
    return userCredential.user;
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
