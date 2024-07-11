import React, { useEffect, useState, useContext } from "react"; // Import necessary hooks and components from React.
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native"; // Import necessary components from react-native.
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons from expo vector icons.
import { getNotifications } from "../../services/firebasefirestore"; // Import the getNotifications function from a service.
import NotificationPopup from "../../components/notificationComponent"; // Import the NotificationPopup component.
import UserDataContext from "../../context/userContext"; // Import UserDataContext for user data.
import AuthContext from "../../context/authContext"; // Import AuthContext for authentication.

const { width } = Dimensions.get("window"); // Get the width of the device's window.

/**
 * NotificationsScreen Component
 * 
 * This component fetches and displays notifications for the user. 
 * Users can tap on a notification to view more details in a popup.
 * 
 * @param {object} props - The component props.
 * @param {object} props.navigation - The navigation object provided by React Navigation for navigating between screens.
 * 
 * @returns {JSX.Element} The NotificationsScreen component.
 */
const NotificationsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext); // Destructure user from AuthContext.
  const { userData, setUserData } = useContext(UserDataContext); // Destructure userData and setUserData from UserDataContext.
  const [notifications, setNotifications] = useState([]); // State to hold the list of notifications.
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup.
  const [selectedNotification, setSelectedNotification] = useState(null); // State to hold the selected notification.

  // useEffect hook to fetch notifications when the component mounts.
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notifs = await getNotifications(userData, user.uid); // Fetch notifications using the getNotifications function.
        console.log("Fetched notifications:", notifs); // Log the fetched notifications.
        setNotifications(notifs); // Set the fetched notifications to the state.
      } catch (error) {
        console.error("error", error); // Log any errors.
      }
    };

    fetchNotifications(); // Call the fetchNotifications function.
  }, []); // Empty dependency array ensures this effect runs once when the component mounts.

  // Function to handle pressing a notification.
  const handleNotificationPress = (notif) => {
    setSelectedNotification(notif); // Set the selected notification.
    setShowPopup(true); // Show the popup.
  };

  // Function to handle closing the popup.
  const handlePopupClose = () => {
    setShowPopup(false); // Hide the popup.
    setSelectedNotification(null); // Clear the selected notification.
  };

  return (
    // ScrollView component to allow vertical scrolling of the content.
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header view containing the logo */}
      <View style={styles.header}>
        <Image source={require("../../images/logo.png")} style={styles.logo} />
      </View>
      {/* Container for notifications */}
      <View style={styles.notificationsContainer}>
        <Text style={styles.title}>Notifications</Text>
        {notifications.length === 0 ? (
          <Text>No notifications available</Text>
        ) : (
          notifications.map((notif, index) => (
            <TouchableOpacity
              key={index}
              style={styles.notificationButton}
              onPress={() => handleNotificationPress(notif)}
            >
              <Text style={styles.buttonText}>{notif.data().title}</Text>
            </TouchableOpacity>
          ))
        )}
        {/* Show the NotificationPopup component if showPopup is true and a notification is selected */}
        {showPopup && selectedNotification && (
          <NotificationPopup
            title={selectedNotification.data().title}
            isResearch={selectedNotification.data().isResearch}
            description={selectedNotification.data().description}
            onClose={handlePopupClose}
            notifId={selectedNotification.id}
          />
        )}
      </View>
    </ScrollView>
  );
};

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allow the container to grow to fit the content
    backgroundColor: "white", // Set the background color to white
    alignItems: "center", // Center the content horizontally
    paddingTop: 40, // Add top padding
  },
  header: {
    height: 60, // Set a fixed height for the header
    alignItems: "center", // Center the content horizontally
    justifyContent: "center", // Center the content vertically
    marginBottom: 20, // Add bottom margin
  },
  logo: {
    width: 320, // Set the width of the logo
    height: 160, // Set the height of the logo
    resizeMode: "contain", // Contain the image within the given width and height
  },
  notificationsContainer: {
    width: width * 0.9, // Set the width of the container to 90% of the screen width
    backgroundColor: "white", // Set the background color to white
    borderRadius: 10, // Set the border radius for rounded corners
    padding: 20, // Add padding around the container
    alignItems: "center", // Center the content horizontally
    shadowColor: "#000", // Set the shadow color
    shadowOffset: { width: 0, height: 5 }, // Set the shadow offset
    shadowOpacity: 0.3, // Set the shadow opacity
    shadowRadius: 10, // Set the shadow radius
    elevation: 5, // Set the elevation for Android shadow
    marginVertical: 20, // Add vertical margin
    marginHorizontal: 20, // Add horizontal margin
  },
  title: {
    fontSize: 20, // Set the font size of the title
    fontWeight: "bold", // Make the title bold
    marginBottom: 20, // Add bottom margin
  },
  notificationButton: {
    width: "100%", // Set the button width to 100% of the container width
    paddingVertical: 15, // Set the vertical padding
    backgroundColor: "#001f54", // Set the background color of the button
    borderRadius: 8, // Set the border radius for rounded corners
    alignItems: "center", // Center the text horizontally within the button
    marginBottom: 15, // Add bottom margin
  },
  buttonText: {
    color: "white", // Set the text color to white
    fontSize: 16, // Set the font size of the text
  },
  homeIcon: {
    position: "absolute", // Position the icon absolutely
    top: 20, // Set the top position
    right: 20, // Set the right position
  },
});

export default NotificationsScreen; // Export the NotificationsScreen component as the default export
