import React, { useEffect, useState, useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getNotifications } from "../../services/firebasefirestore";
import NotificationPopup from "../../components/notificationComponent";
import UserDataContext from "../../context/userContext";
import AuthContext from "../../context/authContext";

const { width } = Dimensions.get("window");

const NotificationsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notifs = await getNotifications(userData, user.uid);
        console.log("Fetched notifications:", notifs);
        setNotifications(notifs);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationPress = (notif) => {
    setSelectedNotification(notif);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedNotification(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../images/logo.png")} style={styles.logo} />
      </View>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    height: 60, // Set a fixed height for the header
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
    marginVertical: 20, // Add margin to ensure rounded corners are visible
    marginHorizontal: 20, // Ensure there is space on the sides of the container
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

export default NotificationsScreen;
