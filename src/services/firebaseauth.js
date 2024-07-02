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

export const checkEmailExists = async (email) => {
  try {
    // Try to fetch sign-in methods for the email
    await auth().fetchSignInMethodsForEmail(email);
    return true;
  } catch (error) {
    if (error.code === "auth/invalid-email") {
      throw new Error("Invalid email format.");
    } else if (error.code === "auth/user-not-found") {
      return false;
    } else {
      throw error;
    }
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
