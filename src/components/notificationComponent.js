import React, { useContext, useState } from "react"; // Import necessary hooks and components from React.
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native"; // Import necessary components from react-native.
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons from expo vector icons.
import AuthContext from "../context/authContext"; // Import AuthContext for authentication context.
import UserDataContext from "../context/userContext"; // Import UserDataContext for user data context.
import { addUserToNotif } from "../services/firebasefirestore"; // Import the addUserToNotif function from firebasefirestore service.

const { width, height } = Dimensions.get("window"); // Get the dimensions of the device's window.

/**
 * NotificationPopup Component
 * 
 * This component displays a popup with notification details. Users can respond to the notification if it is for research purposes.
 * 
 * @param {object} props - The component props.
 * @param {boolean} props.isResearch - Indicates if the notification is for research purposes.
 * @param {string} props.title - The title of the notification.
 * @param {string} props.description - The description of the notification.
 * @param {function} props.onClose - Function to handle closing the popup.
 * @param {string} props.notifId - The ID of the notification.
 * 
 * @returns {JSX.Element} The NotificationPopup component.
 */
const NotificationPopup = ({
  isResearch,
  title,
  description,
  onClose,
  notifId,
}) => {
  const { user } = useContext(AuthContext); // Destructure user from AuthContext.
  const { userData } = useContext(UserDataContext); // Destructure userData from UserDataContext.

  // Function to handle user response to the notification.
  const handleResponse = async (response) => {
    if (response === "yes") {
      try {
        await addUserToNotif(
          user.email,
          userData.diagnosis,
          userData.dob,
          notifId
        ); // Call the addUserToNotif function.
        Alert.alert(
          "Response Recorded",
          "You will be contacted further about this study."
        ); // Show an alert that the response has been recorded.
      } catch (error) {
        console.log(error); // Log any errors.
      }
    }
    onClose(); // Close the popup.
  };

  return (
    // Modal component to display the popup.
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#001f54" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {isResearch && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleResponse("yes")}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleResponse("no")}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

// Define the styles for the components
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, // Allow the container to grow to fit the content
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  popupContainer: {
    width: width * 0.8, // Set the width of the popup to 80% of the screen width
    height: height * 0.5, // Set the height of the popup to 50% of the screen height
    backgroundColor: "white", // Set the background color to white
    borderRadius: 10, // Set the border radius for rounded corners
    padding: 20, // Add padding around the container
    alignItems: "center", // Center the content horizontally
    justifyContent: "center", // Center the content vertically
    shadowColor: "#000", // Set the shadow color
    shadowOffset: { width: 0, height: 5 }, // Set the shadow offset
    shadowOpacity: 0.3, // Set the shadow opacity
    shadowRadius: 10, // Set the shadow radius
    elevation: 5, // Set the elevation for Android shadow
  },
  title: {
    fontSize: 24, // Set the font size of the title
    fontWeight: "bold", // Make the title bold
    color: "#001f54", // Set the text color
    marginBottom: 10, // Add bottom margin
  },
  description: {
    fontSize: 18, // Set the font size of the description
    textAlign: "center", // Center the text horizontally
    marginBottom: 30, // Add bottom margin
    color: "#001f54", // Set the text color
  },
  buttonsContainer: {
    flexDirection: "row", // Arrange children in a row
    justifyContent: "space-around", // Distribute children evenly with space between them
    width: "80%", // Set the width to 80% of the container
  },
  button: {
    backgroundColor: "#001f54", // Set the background color of the button
    paddingHorizontal: 20, // Add horizontal padding
    paddingVertical: 10, // Add vertical padding
    borderRadius: 5, // Set the border radius for rounded corners
  },
  buttonText: {
    color: "white", // Set the text color to white
    fontSize: 16, // Set the font size of the button text
    fontWeight: "bold", // Make the button text bold
  },
  closeButton: {
    position: "absolute", // Position the button absolutely
    top: 10, // Set the top position
    right: 10, // Set the right position
    padding: 5, // Add padding around the button
  },
});

export default NotificationPopup; // Export the NotificationPopup component as the default export
