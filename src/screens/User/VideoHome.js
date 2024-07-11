import React, { useState } from "react"; // Import necessary hooks and components from React.
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from "react-native"; // Import necessary components from react-native.
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons for icons.

/**
 * VideoHome Component
 * 
 * This component displays the home screen for video categories related to Penn State Congenital Heart Center and 
 * Congenital Heart Disease Educational Videos. Users can navigate to the AgeCategories screen by selecting either option.
 * 
 * @param {object} props - The component props.
 * @param {object} props.navigation - The navigation object provided by React Navigation for navigating between screens.
 * 
 * @returns {JSX.Element} The VideoHome component.
 */
const VideoHome = ({ navigation }) => {
  // Function to handle the first icon press
  const handleIcon1Press = () => {
    console.log("Icon 1 pressed");
  };

  // Function to handle the second icon press
  const handleIcon2Press = () => {
    console.log("Icon 2 pressed");
  };

  return (
    // Main container view
    <View style={styles.container}>
      {/* PSU Information Image */}
      <Image
        source={require("../../images/VideoHomePSU.jpeg")}
        style={styles.psuImage}
      />
      {/* Text describing the PSU Information */}
      <Text style={styles.Text}>
        Penn State Congenital Heart Center Information
      </Text>

      {/* Navigation button to AgeCategories screen with 'psu' choice */}
      <Pressable
        onPress={() => {
          navigation.navigate("AgeCategories", { choice: "psu" });
        }}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Go</Text>
      </Pressable>

      {/* Globe Image for CHD Educational Videos */}
      <Image
        source={require("../../images/GlobeIcon.png")}
        style={styles.GlobeImage}
      />
      {/* Text describing the CHD Educational Videos */}
      <Text style={styles.Text}>
        Congenital Heart Disease Educational Videos
      </Text>

      {/* Navigation button to AgeCategories screen with 'chd' choice */}
      <Pressable
        onPress={() => {
          navigation.navigate("AgeCategories", { choice: "chd" });
        }}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Go</Text>
      </Pressable>
    </View>
  );
};

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow the container to grow to fit the content
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    backgroundColor: "#fff", // Set the background color to white
  },
  Text: {
    marginTop: -5, // Adjust the top margin
    textAlign: "center", // Center the text horizontally
    fontWeight: "bold", // Make the text bold
    fontSize: 18, // Set the font size of the text
    width: 300, // Set the width of the text container
    marginBottom: 100, // Add bottom margin
  },
  psuImage: {
    width: 175, // Set the width of the PSU image
    height: 175, // Set the height of the PSU image
    alignSelf: "center", // Center the image horizontally
    marginBottom: 0, // Adjust the bottom margin
    marginTop: 10, // Add top margin
  },
  GlobeImage: {
    width: 260, // Set the width of the Globe image
    height: 180, // Set the height of the Globe image
    alignSelf: "center", // Center the image horizontally
    marginBottom: 20, // Add bottom margin
    marginTop: 20, // Add top margin
  },
  submitButtonText: {
    color: "white", // Set the text color to white
    fontSize: 18, // Set the font size of the button text
    fontWeight: "bold", // Make the button text bold
  },
  submitButton: {
    width: "30%", // Set the button width to 30% of the container width
    height: 50, // Set the button height
    paddingVertical: 15, // Set the vertical padding
    backgroundColor: "#001f54", // Set the background color of the button
    borderRadius: 8, // Set the border radius for rounded corners
    alignItems: "center", // Center the text horizontally within the button
    marginBottom: 40, // Add bottom margin
    marginTop: -90, // Adjust the top margin
  },
});

export default VideoHome; // Export the VideoHome component as the default export
