import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown"; // Ensure this is correct based on documentation
import DoctorContext from "../../context/doctorContext";
import { addDoctor, deactivateDoctor } from "../../services/firebasefirestore";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

const EditDoctorsScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const { doctors } = useContext(DoctorContext);

  const addDoctorPressed = async () => {
    try {
      if (!name.trim()) {
        Alert.alert("Error", "Please enter a doctor name.");
        return;
      }
      await addDoctor(name);
      setName("");
      Alert.alert("Success", "Doctor added successfully");
    } catch (error) {
      console.error("Failed to add doctor: ", error);
    }
  };

  const removeDoctorPressed = async () => {
    try {
      console.log("SelectedDoctor", selectedDoctor);
      if (selectedDoctor === "") {
        Alert.alert("Error", "Please select a doctor to deactivate.");
        return;
      }
      else if(selectedDoctor.label.includes("Not Available")){
        Alert.alert("Error", "Doctor is already marked as unavailable.");
        setSelectedDoctor("");
        return;
      }
      await deactivateDoctor(selectedDoctor);
      Alert.alert("Success", "Doctor deactivated.");
      setSelectedDoctor("");
    } catch (error) {
      console.error("Failed to remove doctor: ", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Add Doctor</Text>
      <TextInput
        style={styles.input}
        placeholder="Doctor Name"
        value={name}
        onChangeText={setName}
      />
      <Pressable style={styles.createButton} onPress={addDoctorPressed}>
        <Text style={styles.createButtonText}>Add Doctor</Text>
      </Pressable>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text style={styles.titleText}>Mark as Inactive</Text>
      <Dropdown
        style={styles.dropdown}
        data={doctors.map((doctor) => ({
          label: doctor.name,
          value: doctor.id,
        }))}
        labelField="label"
        valueField="value"
        placeholder="Select Doctor..."
        value={selectedDoctor}
        onChange={(item) => {
          setSelectedDoctor(item);
        }}
        renderLeftIcon={() => (
          <Icon name="people" size={24} color="#000" />
        )}
      />
      <Text></Text>
      <Pressable style={styles.deleteButton} onPress={removeDoctorPressed}>
        <Text style={styles.createButtonText}>Mark as Inactive</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    width: width * 0.9,
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  createButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#001f54",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  deleteButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#ff0000",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdown: {
    margin: 10,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default EditDoctorsScreen;
