import React, { useContext, useState, useEffect } from "react"; // Import necessary hooks and components from React.
import {
  Alert,
  Button,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native"; // Import necessary components from react-native.
import CategoryContext from "../../context/categoryContext"; // Import CategoryContext for categories data.

const logo = require("../../images/play_button.jpg"); // Import the logo image.

/**
 * SubCategories Component
 * 
 * This component displays a list of subcategories based on the selected type and age group.
 * Users can tap on a subcategory to navigate to the VideoGallery screen.
 * 
 * @param {object} props - The component props.
 * @param {object} props.route - The route object provided by React Navigation, containing parameters passed to this screen.
 * @param {object} props.navigation - The navigation object provided by React Navigation for navigating between screens.
 * 
 * @returns {JSX.Element} The SubCategories component.
 */
const SubCategories = ({ route, navigation }) => {
  const { categories } = useContext(CategoryContext); // Destructure categories from CategoryContext.
  const [subCategories, setSubCategories] = useState([]); // State to hold the list of subcategories.
  const { type, age } = route.params; // Destructure type and age from route params.

  // useEffect hook to fetch subcategories when type or age changes.
  useEffect(() => {
    if (type && age) {
      const videoType = type.toLowerCase(); // Convert type to lowercase.
      const ageGroup = age.toLowerCase(); // Convert age to lowercase.
      const subCategories = categories[videoType][ageGroup]; // Get subcategories based on type and age.

      if (subCategories && Array.isArray(subCategories)) {
        setSubCategories(subCategories); // Set the fetched subcategories to the state.
      } else {
        console.log("subCategories is not an array or is undefined"); // Log a message if subcategories is not an array or is undefined.
      }
    }
  }, [type, age, categories]); // Dependency array to run the effect when type, age, or categories change.

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Map over the subCategories array and render each subcategory */}
        {subCategories.map((subCategory, index) => (
          <View key={index} style={styles.itemContainer}>
             {/* Navigate to the VideoGallery screen with the selected subcategory.*/}
            <Pressable
              style={[styles.item, styles.roundedEdges]}
              onPress={() => {
                navigation.navigate("VideoGallery", {
                  type,
                  age,
                  subCategory,
                });
              }}
            >
              {/* Display the logo image */}
              <Image source={logo} style={styles.image} />
            </Pressable>
            {/* Display the subcategory name */}
            <Text style={styles.name}>{subCategory}</Text> 
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Define the styles for the components
const styles = StyleSheet.create({
  image: {
    height: 150, // Set the height of the image
    width: "100%", // Set the width of the image to 100%
  },
  container: {
    flex: 1, // Allow the container to grow to fit the content
    flexDirection: "row", // Arrange children in a row
    flexWrap: "wrap", // Wrap the children to the next line
    alignContent: "flex-start", // Align the content to the start of the container
  },
  itemContainer: {
    width: "50%", // Set the width of the item container to 50%
    padding: 10, // Add padding around the item container
  },
  item: {
    backgroundColor: "#EEEEEE", // Set the background color of the item
    height: 150, // Set the height of the item
    overflow: "hidden", // Hide overflow content
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  name: {
    textAlign: "center", // Center the text horizontally
    fontWeight: "bold", // Make the text bold
    fontSize: 14, // Set the font size of the text
    marginTop: 10, // Add top margin to the text
  },
  roundedEdges: {
    borderRadius: 15, // Set the border radius for rounded corners
  },
});

export default SubCategories; // Export the SubCategories component as the default export
