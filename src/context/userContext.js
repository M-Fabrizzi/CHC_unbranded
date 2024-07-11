import React, { createContext, useState, useEffect, useContext } from "react"; // Import necessary hooks and components from React.
import firestore from "@react-native-firebase/firestore"; // Import Firestore from react-native-firebase.
import AuthContext from "./authContext"; // Import AuthContext to get the authenticated user.

// Create a context for user data.
const UserDataContext = createContext();

// Define the UserDataProvider component which will provide user data to its children.
export const UserDataProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Get the current user from AuthContext.
  const [userData, setUserData] = useState(null); // State to hold the user data.

  // useEffect hook to fetch user data from Firestore when the user changes.
  useEffect(() => {
    if (user) {
      // Subscribe to real-time updates for the current user's document.
      const unsubscribe = firestore()
        .collection("UserPost")
        .doc(user.uid)
        .onSnapshot((documentSnapshot) => {
          setUserData(documentSnapshot.data()); // Update the userData state with the fetched data.
        });

      // Clean up the subscription on component unmount.
      return () => unsubscribe();
    }
  }, [user]); // Dependency array to run the effect when the user changes.

  // Provide the userData and setUserData to the component's children.
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext; // Export the UserDataContext for use in other components.
