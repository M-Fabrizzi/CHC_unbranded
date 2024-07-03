import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const AdminHomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require("../images/logo.png")} style={styles.logo} />
      </View>
      <Pressable style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate("AddVideo");
          }}
        >
          <MaterialIcons name="add-circle-outline" size={60} color="white" />
        </TouchableOpacity>
        <Text style={styles.optionText}>Add New Video</Text>
      </Pressable>
      <Pressable style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate("AdminNotifications");
          }}
        >
          <MaterialIcons name="add-circle-outline" size={60} color="white" />
        </TouchableOpacity>
        <Text style={styles.optionText}>Send Notification</Text>
      </Pressable>
      <Pressable style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate("NewCategory");
          }}
        >
          <MaterialIcons name="add-circle-outline" size={60} color="white" />
        </TouchableOpacity>
        <Text style={styles.optionText}>Create New Video Category</Text>
      </Pressable>


      <Pressable style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate("AdminManageNotifications");
          }}
        >
          <MaterialIcons name="add-circle-outline" size={60} color="white" />
        </TouchableOpacity>
        <Text style={styles.optionText}>Manage Notifications</Text>
      </Pressable>

      <Pressable style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {

            navigation.navigate("AgeClassification");
          }}
        >
          <MaterialIcons name="add-circle-outline" size={60} color="white" />
        </TouchableOpacity>
        <Text style={styles.optionText}>Transitional Messaging</Text>
      </Pressable>
      <Pressable style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {

            navigation.navigate("EditDoctors");
          }}
        >
          <MaterialIcons name="add-circle-outline" size={60} color="white" />
        </TouchableOpacity>
        <Text style={styles.optionText}>Edit Doctors</Text>
      </Pressable>

      <Pressable style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate("ManageVideos");
          }}
        >
          <MaterialIcons name="remove-circle-outline" size={60} color="white" />
          </TouchableOpacity>
        <Text style={styles.optionText}>Delete Video</Text>
      </Pressable>

      <Pressable style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate("DeleteCategory");
          }}
        >
          <MaterialIcons name="remove-circle-outline" size={60} color="white" />
        </TouchableOpacity>
        <Text style={styles.optionText}>Delete Video Sub-Category</Text>
      </Pressable>
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
  optionContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  iconButton: {
    width: width * 0.7,
    height: 80,
    backgroundColor: "#dde6eb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AdminHomeScreen;