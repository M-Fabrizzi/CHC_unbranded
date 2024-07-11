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
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff", 
  },
  Text: {
    marginTop: -5, 
    textAlign: "center", 
    fontWeight: "bold", 
    fontSize: 18, 
    width: 300, 
    marginBottom: 100, 
  },
  psuImage: {
    width: 175, 
    height: 175, 
    alignSelf: "center", 
    marginBottom: 0, 
    marginTop: 10, 
  },
  GlobeImage: {
    width: 260, 
    height: 180, 
    alignSelf: "center",
    marginBottom: 20, 
    marginTop: 20, 
  },
  submitButtonText: {
    color: "white", 
    fontSize: 18, 
    fontWeight: "bold", 
  },
  submitButton: {
    width: "30%", 
    height: 50, 
    paddingVertical: 15, 
    backgroundColor: "#001f54", 
    borderRadius: 8, 
    alignItems: "center", 
    marginBottom: 40, 
    marginTop: -90, 
  },
});

export default VideoHome; // Export the VideoHome component as the default export
