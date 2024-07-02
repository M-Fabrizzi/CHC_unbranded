import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AdminNotificationPopup from "../components/adminNotificationComponent";
import { diagnosis } from "./allthedata";
import { getAdminNotifications } from "../services/firebasefirestore";

const AdminManageNotifications = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [diagnosisValue, setDiagnosisValue] = useState([]);
  const [ageGroupValue, setAgeGroupValue] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const fetchNotifications = async () => {
    // Fetch notifications
    const fetchedNotifications = await getAdminNotifications(
      ageGroupValue,
      diagnosisValue
    );

    // Store the selected age group and diagnosis for each notification
    const notificationsWithDetails = fetchedNotifications.map(
      (notification) => {
        const pathParts = notification._ref._documentPath._parts;
        const diagnosis = pathParts[1];
        const ageGroup = pathParts[2];
        console.log("diagnosis", diagnosis);
        return {
          id: notification.id,
          data: notification.data(),
          diagnosis: diagnosis,
          ageGroup: ageGroup,
        };
      }
    );

    console.log(notificationsWithDetails);

    setNotifications(notificationsWithDetails);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text>Select Diagnosis:</Text>
        <SectionedMultiSelect
          styles={{ selectToggle: styles.dropdown }}
          items={diagnosis.map((item) => ({
            name: item.label,
            id: item.value,
          }))}
          selectText="Diagnosis"
          uniqueKey="name"
          searchPlaceholderText="Choose diagnosis..."
          IconRenderer={MaterialIcons}
          confirmText="Select"
          selectedItems={diagnosisValue}
          onSelectedItemsChange={setDiagnosisValue}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <Text>Select Age Group:</Text>
        <SectionedMultiSelect
          styles={{ selectToggle: styles.dropdown }}
          items={[
            { name: "Pediatric", id: "1" },
            { name: "Transition", id: "2" },
            { name: "Adult", id: "3" },
          ]}
          selectText="Age Group"
          uniqueKey="name"
          searchPlaceholderText="Choose Age Group..."
          IconRenderer={MaterialIcons}
          confirmText="Select"
          selectedItems={ageGroupValue}
          onSelectedItemsChange={setAgeGroupValue}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={fetchNotifications}>
        <Text style={styles.buttonText}>Get Notifications</Text>
      </TouchableOpacity>

      {notifications.map((notification) => (
        <TouchableOpacity
          key={notification.id}
          style={styles.notificationCard}
          onPress={() => {
            setSelectedNotification(notification);
            setPopupVisible(true);
          }}
        >
          <Text style={styles.notificationTitle}>
            {notification.data.title || "No title"}
          </Text>
          <Text style={styles.notificationDescription}>
            {notification.data.description || "No description"}
          </Text>
        </TouchableOpacity>
      ))}

      {isPopupVisible && selectedNotification && (
        <AdminNotificationPopup
          isResearch={selectedNotification.data.isResearch}
          title={selectedNotification.data.title}
          description={selectedNotification.data.description}
          onClose={() => setPopupVisible(false)}
          handleResponse={(response) => setPopupVisible(false)}
          users={selectedNotification.data.users}
          notifId={selectedNotification.id}
          diagnosis={selectedNotification.diagnosis}
          ageGroup={selectedNotification.ageGroup}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown:{
    width: "95%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "white",

  },
  button: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#001f54",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#001f54",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#001f54",
    marginTop: 5,
  },
});

export default AdminManageNotifications;