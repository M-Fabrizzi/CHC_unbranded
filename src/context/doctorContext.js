import React, { createContext, useState, useEffect } from "react"; // Import necessary hooks and components from React.
import firestore from "@react-native-firebase/firestore"; // Import Firestore from react-native-firebase.

// Create a context for doctors.
const DoctorContext = createContext();

// Define the DoctorProvider component which will provide doctor data to its children.
export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]); // State to hold the doctors data.

  // useEffect hook to fetch doctors data from Firestore.
  useEffect(() => {
    // Reference to the Doctors collection in Firestore.
    const doctorsCollection = firestore().collection("Doctors");

    // Subscribe to real-time updates from the Doctors collection.
    const unsubscribe = doctorsCollection.onSnapshot(
      (snapshot) => {
        if (!snapshot.empty) {
          // If the snapshot is not empty, map through the documents and create a list of doctors.
          const doctorsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Fetched doctors:", doctorsList); // Log the fetched doctors.
          setDoctors(doctorsList); // Update the doctors state with the fetched data.
        } else {
          console.log("No doctors found in Firestore."); // Log a message if no doctors are found.
        }
      },
      (error) => {
        console.error("Error fetching doctors: ", error); // Log an error message if there is an error fetching doctors.
      }
    );

    // Cleanup the subscription on component unmount.
    return () => unsubscribe();
  }, []); // Dependency array to run the effect once on component mount.

  // Provide the doctors data to the component's children.
  return (
    <DoctorContext.Provider value={{ doctors }}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContext; // Export the DoctorContext for use in other components.
