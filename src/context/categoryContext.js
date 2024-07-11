import React, { createContext, useState, useEffect } from "react"; // Import necessary hooks and components from React.
import firestore from "@react-native-firebase/firestore"; // Import Firestore from react-native-firebase.

// Create a context for categories.
const CategoryContext = createContext();

// Define the CategoryProvider component which will provide category data to its children.
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]); // State to hold the categories data.

  // useEffect hook to fetch categories data from Firestore.
  useEffect(() => {
    // Define an asynchronous function to fetch categories.
    const fetchCategories = async () => {
      const agegroup = ["Adult", "Child and Peds", "Transition"]; // Define age groups.
      
      // Reference to the PSU Heart Information document in Firestore.
      const categoriesCollectionPSUref = firestore()
        .collection("Categories")
        .doc("PSU Heart Information");
      
      // Reference to the CHD Educational Videos document in Firestore.
      const categoriesCollectionCHDref = firestore()
        .collection("Categories")
        .doc("CHD Educational Videos");

      // Initialize an object to hold the fetched data.
      let dataDict = {
        psu: {},
        chd: {},
      };

      // Loop through each age group to fetch the respective categories.
      for (const age of agegroup) {
        const categoryPSU = await categoriesCollectionPSUref
          .collection(age)
          .get(); // Fetch PSU categories for the current age group.
        const categoryCHD = await categoriesCollectionCHDref
          .collection(age)
          .get(); // Fetch CHD categories for the current age group.

        // Extract the document IDs from the fetched data.
        const PSUdocs = categoryPSU.docs.map((doc) => doc.id);
        const CHDdocs = categoryCHD.docs.map((doc) => doc.id);

        // Store the fetched document IDs in the data dictionary.
        dataDict.psu[age.toLowerCase()] = PSUdocs;
        dataDict.chd[age.toLowerCase()] = CHDdocs;
      }

      // Update the categories state with the fetched data.
      setCategories(dataDict);
    };

    fetchCategories(); // Call the function to fetch categories data.
  }, []); // Dependency array to run the effect once on component mount.

  // Provide the categories data to the component's children.
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext; // Export the CategoryContext for use in other components.
