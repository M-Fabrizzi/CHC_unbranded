import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import {
  fetchUserData,
  pushNotificationtoindividual,
  pushNotificationtouid,
} from "../../services/firebasefirestore";

const AgeClassification = () => {
  const [userData, setUserData] = useState([]);
  const [enteredAge, setEnteredAge] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const isResearch = false;

  const handleFetchUserData = async () => {
    try {
      if (enteredAge === "") {
        Alert.alert("Error", "Please enter an age.");
        return;
      }
      const data = await fetchUserData();
      if (fetchUserData.empty) {
        setUserData(data);
      }
      else {
        Alert.alert("Alert", "No users found");
      }
  
    } catch (error) {
      Alert.alert("Error", "No users found");
    }
  };

  const handleSendNotification = () => {
    if (title === "" || description === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    filteredUserData.forEach(async (user) => {
      console.log("USER", user);
      await pushNotificationtouid(user.id, {
        title,
        description,
        isResearch,
      });
    });
    Alert.alert("Success", "Notifications sent to all matching users.");
  };

  const filteredUserData = userData.filter((user) => {
    if (!enteredAge) return true;
    const birthYear = new Date(user.dob).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear === parseInt(enteredAge, 10);
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Transitional Age"
        keyboardType="numeric"
        value={enteredAge}
        onChangeText={(text) => setEnteredAge(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleFetchUserData}>
        <Text style={styles.buttonText}>Fetch User Data</Text>
      </TouchableOpacity>

      {filteredUserData.length > 0 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Notification Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Notification Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSendNotification}
          >
            <Text style={styles.buttonText}>Send Notification</Text>
          </TouchableOpacity>
          <View style={styles.dataContainer}>
            {filteredUserData.map((user) => (
              <View key={user.id} style={styles.userCard}>
                {/* <Text style={styles.userText}>ID: {user.id}</Text> */}
                <Text style={styles.userText}>
                  Name: {user.first_name} {user.last_name}
                </Text>
                <Text style={styles.userText}>Diagnosis: {user.diagnosis}</Text>
                <Text style={styles.userText}>DOB: {user.dob}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
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
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dataContainer: {
    marginTop: 20,
    width: "100%",
  },
  userCard: {
    backgroundColor: "#4287f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default AgeClassification;
