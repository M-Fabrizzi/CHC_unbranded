import React, { createContext, useState, useEffect } from "react"; // Import necessary hooks and components from React.
import auth from "@react-native-firebase/auth"; // Import the authentication module from react-native-firebase.

// Create a context for authentication.
const AuthContext = createContext();

// Define the AuthProvider component which will provide authentication data to its children.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the current user.

  // useEffect hook to handle authentication state changes.
  useEffect(() => {
    // Subscribe to authentication state changes.
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user); // Update the user state when authentication state changes.
    });

    // Cleanup the subscription on component unmount.
    return unsubscribe;
  }, []);

  // Provide the user and setUser state to the component's children.
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; // Export the AuthContext for use in other components.
