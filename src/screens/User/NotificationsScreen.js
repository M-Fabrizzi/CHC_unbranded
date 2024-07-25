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
    flexGrow: 1, 
    backgroundColor: "white", 
    alignItems: "center", 
    paddingTop: 40,
  },
  header: {
    height: 60,
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 20,
  },
  logo: {
    width: 320, 
    height: 160, 
    resizeMode: "contain", 
  },
  notificationsContainer: {
    width: width * 0.9, 
    backgroundColor: "white", 
    borderRadius: 10,
    padding: 20,
    alignItems: "center", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 20, 
    marginHorizontal: 20, 
  },
  title: {
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 20, 
  },
  notificationButton: {
    width: "100%", 
    paddingVertical: 15, 
    backgroundColor: "#001f54",
    borderRadius: 8, 
    alignItems: "center", 
    marginBottom: 15, 
  },
  buttonText: {
    color: "white", 
    fontSize: 16, 
  },
  homeIcon: {
    position: "absolute", 
    top: 20, 
    right: 20, 
  },
});

export default NotificationsScreen; // Export the NotificationsScreen component as the default export
