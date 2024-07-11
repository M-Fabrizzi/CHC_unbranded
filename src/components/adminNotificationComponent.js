import React, { useEffect } from "react"; // Import necessary hooks and components from React.
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native"; // Import necessary components from react-native.
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons from expo vector icons.
import * as FileSystem from "expo-file-system"; // Import FileSystem from expo-file-system for file handling.
import { deleteNotification } from "../services/firebasefirestore"; // Import the deleteNotification function from firebasefirestore service.

const { width, height } = Dimensions.get("window"); // Get the dimensions of the device's window.

/**
 * AdminNotificationPopup Component
 * 
 * This component displays a popup with notification details for administrators.
 * It allows administrators to view users, delete the notification, and download a list of users.
 * 
 * @param {object} props - The component props.
 * @param {boolean} props.isResearch - Indicates if the notification is for research purposes.
 * @param {string} props.title - The title of the notification.
 * @param {string} props.description - The description of the notification.
 * @param {function} props.onClose - Function to handle closing the popup.
 * @param {Array} [props.users=[]] - List of users associated with the notification.
 * @param {string} props.notifId - The ID of the notification.
 * @param {string} props.diagnosis - The diagnosis category of the notification.
 * @param {string} props.ageGroup - The age group category of the notification.
 * 
 * @returns {JSX.Element} The AdminNotificationPopup component.
 */
const AdminNotificationPopup = ({
  isResearch,
  title,
  description,
  onClose,
  users = [],
  notifId,
  diagnosis,
  ageGroup,
}) => {
  // useEffect hook to log the list of users when it changes.
  useEffect(() => {
    console.log("Users:", users);
  }, [users]);

  // Function to handle deleting the notification.
  const handleDelete = async () => {
    console.log(notifId, ageGroup, diagnosis);
    await deleteNotification(notifId, ageGroup, diagnosis); // Call the deleteNotification function.
    Alert.alert("Notification Deleted."); // Show an alert that the notification is deleted.
    onClose(); // Close the popup.
  };

  // Function to handle downloading the list of users.
  const handleDownload = async () => {
    const content = users.join("\n"); // Join the list of users into a single string separated by new lines.
    const fileName = `Users_${notifId}.txt`; // Create a file name using the notification ID.
    const fileUri = FileSystem.documentDirectory + fileName; // Define the file URI.

    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding: FileSystem.EncodingType.UTF8, // Write the content to the file with UTF-8 encoding.
    });

    Alert.alert("File Downloaded", `The file has been downloaded to: ${fileUri}`); // Show an alert that the file has been downloaded.
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
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#001f54" />
          </TouchableOpacity>

          {isResearch && (
            <View style={styles.userListContainer}>
              <Text>List of Users who said yes</Text>
              <FlatList
                data={users}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.userItem}>
                    <Text style={styles.userName}>{item}</Text>
                  </View>
                )}
                ListEmptyComponent={
                  <Text style={styles.noUsersText}>No users found</Text>
                }
              />
            </View>
          )}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            {isResearch && users.length > 0 && (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={handleDownload}
              >
                <Text style={styles.buttonText}>Download</Text>
              </TouchableOpacity>
            )}
          </View>
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
    width: width * 0.9, // Set the width of the popup to 90% of the screen width
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
  actionsContainer: {
    flexDirection: "row", // Arrange children in a row
    justifyContent: "space-between", // Distribute children evenly with space between them
    width: "80%", // Set the width to 80% of the container
  },
  deleteButton: {
    backgroundColor: "#FF0000", // Set the background color to red
    paddingHorizontal: 20, // Add horizontal padding
    paddingVertical: 10, // Add vertical padding
    borderRadius: 5, // Set the border radius for rounded corners
  },
  downloadButton: {
    backgroundColor: "#4CAF50", // Set the background color to green
    paddingHorizontal: 20, // Add horizontal padding
    paddingVertical: 10, // Add vertical padding
    borderRadius: 5, // Set the border radius for rounded corners
  },
  userListContainer: {
    width: "100%", // Set the width to 100%
    maxHeight: height * 0.3, // Set the maximum height to 30% of the screen height
  },
  userItem: {
    padding: 10, // Add padding around the item
    borderBottomWidth: 1, // Add a bottom border
    borderBottomColor: "#ccc", // Set the border color
    width: "100%", // Set the width to 100%
  },
  userName: {
    fontSize: 18, // Set the font size
    color: "#001f54", // Set the text color
  },
  noUsersText: {
    textAlign: "center", // Center the text horizontally
    color: "#001f54", // Set the text color
    marginTop: 20, // Add top margin
  },
  closeButton: {
    position: "absolute", // Position the button absolutely
    top: 10, // Set the top position
    right: 10, // Set the right position
    padding: 5, // Add padding around the button
  },
  buttonText: {
    color: "white", // Set the text color to white
    fontWeight: "bold", // Make the text bold
  },
});

export default AdminNotificationPopup; // Export the AdminNotificationPopup component as the default export
