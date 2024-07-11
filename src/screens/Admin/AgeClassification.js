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
        //alerts user if no age entered
        Alert.alert("Error", "Please enter an age.");
        return;
      }
      const data = await fetchUserData();
      if (!fetchUserData.empty) {
        setUserData(data); //Update state with fetched user data
      } else {
        Alert.alert("Alert", "No users found"); //alert if no users are found
      }
    } catch (error) {
      Alert.alert("Error", "No users found");
    }
  };

  const handleSendNotification = () => {
    // Alert if title or description empty
    if (title === "" || description === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    filteredUserData.forEach(async (user) => {
      console.log("USER", user);
      await pushNotificationtouid(user.id, { // Send notifications to each user in filteredUserData
        title,
        description,
        isResearch,
      });
    });
    // Alert success message
    Alert.alert("Success", "Notifications sent to all matching users.");
  };

  const filteredUserData = userData.filter((user) => {
    if (!enteredAge) return true; // If no age entered, return all users
    const birthYear = new Date(user.dob).getFullYear();// Get birth year from users birthday
    const currentYear = new Date().getFullYear();// Get current year
    return currentYear - birthYear === parseInt(enteredAge, 10); // filter users based on entered age
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Transitional Age"
        keyboardType="numeric" // only allows numeric input
        //populates enteredAge with age entered
        value={enteredAge}
        onChangeText={(text) => setEnteredAge(text)}  // Updates the enteredAge when text change
      />
      <TouchableOpacity style={styles.button} onPress={handleFetchUserData}>
        <Text style={styles.buttonText}>Fetch User Data</Text>
      </TouchableOpacity>

      {filteredUserData.length > 0 && ( // Check if there are users in filteredUserData array
        <>
          <TextInput
            style={styles.input}
            placeholder="Notification Title"
            value={title} // set value of the input to title state
            onChangeText={(text) => setTitle(text)} // Update the title state as text changes
          />
          <TextInput
            style={styles.input}
            placeholder="Notification Description"
            value={description} // set value of the description to title state
            onChangeText={(text) => setDescription(text)} // Update the description state as text changes
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSendNotification} // call handleSendNotification function when pressed
          >
            <Text style={styles.buttonText}>Send Notification</Text>
          </TouchableOpacity>
          <View style={styles.dataContainer}>
            {filteredUserData.map((user) => ( // Map over filteredUserData array to get user information
              <View key={user.id} style={styles.userCard}>
                {/* <Text style={styles.userText}>ID: {user.id}</Text> */}
                <Text style={styles.userText}>
                  Name: {user.first_name} {user.last_name} {/* Display user's first and last name */}
                </Text>
                <Text style={styles.userText}>Diagnosis: {user.diagnosis}</Text> {/* Display user's diagnosis */}
                <Text style={styles.userText}>DOB: {user.dob}</Text> {/* Display user's date of birth */}
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
