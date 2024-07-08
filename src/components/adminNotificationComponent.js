import React, { useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { deleteNotification } from "../services/firebasefirestore";

const { width, height } = Dimensions.get("window");

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
  useEffect(() => {
    console.log("Users:", users);
  }, [users]);

  const handleDelete = async () => {
    console.log(notifId, ageGroup, diagnosis);
    await deleteNotification(notifId, ageGroup, diagnosis);
    Alert.alert("Notification Deleted.")
    onClose();
  };

  const handleDownload = async () => {
    const content = users.join("\n");
    const fileName = `Users_${notifId}.txt`;
    const fileUri = FileSystem.documentDirectory + fileName;

    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    Alert.alert(
      "File Downloaded",
      `The file has been downloaded to: ${fileUri}`
    );
  };

  return (
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContainer: {
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#001f54",
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  downloadButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  userListContainer: {
    width: "100%",
    maxHeight: height * 0.3,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  userName: {
    fontSize: 18,
    color: "#001f54",
  },
  noUsersText: {
    textAlign: "center",
    color: "#001f54",
    marginTop: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AdminNotificationPopup;
