import React from "react"; // Import the React library to use React components.
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native"; // Import necessary components from react-native.

/**
 * HomePage Component
 * 
 * This component renders the home page with navigation options to different screens 
 * such as Video Gallery, Edit Personal Info, Notifications, and Contact.
 * 
 * @param {object} props - The component props.
 * @param {object} props.navigation - The navigation object provided by React Navigation for navigating between screens.
 * 
 * @returns {JSX.Element} The HomePage component.
 */
const HomePage = ({ navigation }) => {
  // Determine if the device is in dark mode.
  const isDarkMode = useColorScheme() === "dark";

  // Define the background style based on the color scheme.
  const backgroundStyle = {
    backgroundColor: isDarkMode ? "black" : "white",
    flex: 1,
    padding: 20,
    marginTop: -7,
  };

  // Define the text style based on the color scheme.
  const textStyle = {
    color: isDarkMode ? "white" : "black",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  };

  // Define the navigation text style based on the color scheme.
  const navigationText = {
    color: isDarkMode ? "white" : "black",
    fontSize: 18,
    textAlign: "center",
  };

  return (
    // SafeAreaView component to ensure the UI is within the safe area boundaries.
    <SafeAreaView style={styles.safeArea}>
      {/* StatusBar component to control the appearance of the status bar. */}
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* Main container view */}
      <View style={backgroundStyle}>
        {/* Logo Image */}
        <View style={{ alignItems: "center", marginBottom: 9 }}>
          <Image
            source={require("../../images/image2.png")}
            style={{ width: 380, height: 80 }}
          />
        </View>

        {/* Navigation option to Video Gallery */}
        <Pressable
          onPress={() => {
            navigation.navigate("VideoHome");
          }}
        >
          <Image
            source={require("../../images/box2.png")}
            style={[styles.navigationImage, styles.roundedEdges]}
          />
          <Text style={styles.centeredBoldText}>Video Gallery</Text>
        </Pressable>

        {/* Navigation option to Edit Personal Info */}
        <Pressable
          onPress={() => {
            navigation.navigate("EditDetails");
          }}
        >
          <Image
            source={require("../../images/box1.png")}
            style={[styles.navigationImage, styles.roundedEdges]}
          />
          <Text style={styles.centeredBoldText}>Edit Personal Info</Text>
        </Pressable>

        {/* Navigation option to Notifications */}
        <Pressable
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Image
            source={require("../../images/box3.png")}
            style={[styles.navigationImage, styles.roundedEdges]}
          />
          <Text style={styles.centeredBoldText}>Notifications</Text>
        </Pressable>

        {/* Navigation option to Contact */}
        <Pressable
          onPress={() => {
            navigation.navigate("Contact");
          }}
        >
          <Image
            source={require("../../images/box4.png")}
            style={[styles.navigationImage, styles.roundedEdges]}
          />
          <Text style={styles.centeredBoldText}>Contact</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

// Define the styles for the components
const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Allow the container to grow to fit the content
  },
  navigationImage: {
    width: 200, // Set the width of the navigation images
    height: 88, // Set the height of the navigation images
    alignSelf: "center", // Center the images horizontally
    marginBottom: 20, // Add bottom margin to the images
  },
  roundedEdges: {
    borderRadius: 10, // Set the border radius for rounded corners
  },
  centeredBoldText: {
    textAlign: "center", // Center the text horizontally
    fontWeight: "bold", // Make the text bold
    fontSize: 16, // Set the font size of the text
    marginBottom: 20, // Add bottom margin to the text
    marginTop: -20, // Adjust the top margin of the text
  },
});

export default HomePage; // Export the HomePage component as the default export
