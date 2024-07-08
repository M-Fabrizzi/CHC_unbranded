import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import DoctorContext from "../../context/doctorContext";
import { addDoctor, deactivateDoctor } from "../../services/firebasefirestore";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

const EditDoctorsScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const { doctors } = useContext(DoctorContext);
  console.log(doctors);

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
      if (selectedDoctors.length === 0) {
        Alert.alert("Error", "Please select a doctor to deactivate.");
        return;
      }
      await deactivateDoctor(selectedDoctors);
      setSelectedDoctors("");
      Alert.alert("Success", "Doctor(s) deactivated");
    } catch (error) {
      console.error("Failed to remove doctor: ", error);
    }
  };

  return (
    <View style={styles.container}>
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
      <SectionedMultiSelect
        items={doctors.map((doctor) => ({
          id: doctor.id,
          name: doctor.name,
        }))}
        uniqueKey="id"
        displayKey="name"
        selectText="Select Doctors..."
        onSelectedItemsChange={setSelectedDoctors}
        selectedItems={selectedDoctors}
        IconRenderer={Icon} // Add this line
        styles={{
          selectToggle: styles.selectToggle,
          selectToggleText: styles.selectToggleText,
          chipText: styles.chipText,
          itemText: styles.itemText,
          selectedItemText: styles.selectedItemText,
        }}
      />
      <Text></Text>
      <Pressable style={styles.deleteButton} onPress={removeDoctorPressed}>
        <Text style={styles.createButtonText}>Mark as Inactive</Text>
      </Pressable>
    </View>
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
  selectToggle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  selectToggleText: {
    fontSize: 16,
  },
  chipText: {
    fontSize: 16,
  },
  itemText: {
    fontSize: 22,
    fontWeight: "light",
  },
  selectedItemText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default EditDoctorsScreen;
