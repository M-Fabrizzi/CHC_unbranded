import React, { useContext, useState } from "react";
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/FontAwesome";
import { diagnosis, raceData } from "../allthedata";
import {
  addUserData,
  addUserToFirestore,
} from "../../services/firebasefirestore";
import { signUp } from "../../services/firebaseauth";
import DoctorContext from "../../context/doctorContext";

/**
 * First registration screen. 
 * Allows the user to input personal information.
 */

function Register1({ navigation }) {
  // State variables for storing user input
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [zipCodeValue, setZipCodeValue] = useState("");
  const [diagnosisValue, setDiagnosisValue] = useState(null);
  const [additionalDiagnosis, setAdditionalDiagnosis] = useState(null);
  const [raceValue, setRaceValue] = useState(null);
  const [birthValue, setBirthValue] = useState(null);
  const [iscardiologistValue, setIsCardiologistValue] = useState(null);
  const [CardiologistValue, setCardiologistValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dob, setDob] = useState("");
  const { doctors } = useContext(DoctorContext); // Use context to get the list of doctors

  // Change method for date picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; // Use selected date or keep the current date
    setShow(false); // Hide the date picker
    setDate(currentDate); // Update the date state
    setDob(dayjs(currentDate).format("YYYY-MM-DD")); // Format and set date of birth
  };

  const showDatepicker = () => {
    setShow(true); // Show the date picker
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* First name input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.textInput}
            value={firstNameValue}
            onChangeText={setFirstNameValue}
            placeholder="Enter first name"
          />
        </View>

        {/* Last name input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.textInput}
            value={lastNameValue}
            onChangeText={setLastNameValue}
            placeholder="Enter last name"
          />
        </View>

        {/* Date picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth:</Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.textInput}
              value={dob}
              placeholder="YYYY-MM-DD"
              editable={true} // Make the text input editable
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={showDatepicker} // Show date picker on press
            >
              <Icon name="calendar" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange} // Update date on change
          />
        )}

        {/* Assigned sex dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Assigned sex at birth:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Rather not answer", value: "Rather not answer" },
            ]}
            labelField="label"
            valueField="value"
            placeholder={"Select an option"}
            value={birthValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setBirthValue(item.value); // Update assigned sex value
              setIsFocus(false);
            }}
          />
        </View>

        {/* Race dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select race:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={raceData.map((item) => ({
              label: item.label,
              value: item.label,
            }))}
            labelField="label"
            valueField="value"
            placeholder={"Select an option"}
            value={raceValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setRaceValue(item.value); // Update race value
              setIsFocus(false);
            }}
          />
        </View>

        {/* Cardiologist follow-up dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Are you followed by a congenital cardiologist at Penn State:
          </Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
              {
                label: "I'd rather not answer",
                value: "I'd rather not answer",
              },
            ]}
            labelField="label"
            valueField="value"
            placeholder={"Select an option"}
            value={iscardiologistValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setIsCardiologistValue(item.value); // Update follow-up status
              setIsFocus(false);
            }}
          />
        </View>

        {/* Cardiologist selection dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Who is your primary congenital cardiologist:
          </Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={doctors.map((item) => ({
              label: item.name,
              value: item.name,
            }))}
            labelField="label"
            valueField="value"
            placeholder={"Select an option"}
            value={CardiologistValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setCardiologistValue(item.value); // Update cardiologist value
              setIsFocus(false);
            }}
          />
        </View>

        {/* Zip code input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Zip Code:</Text>
          <TextInput
            style={styles.textInput}
            value={zipCodeValue}
            onChangeText={setZipCodeValue}
            placeholder="Zip Code"
          />
        </View>

        {/* Diagnosis dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Diagnosis:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={diagnosis.map((item) => ({
              label: item.label,
              value: item.label,
            }))}
            labelField="label"
            valueField="value"
            placeholder={"Select your diagnosis"}
            value={diagnosisValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setDiagnosisValue(item.value); // Update diagnosis value
              setIsFocus(false);
            }}
          />
        </View>

        {/* Additional diagnosis input, shown if "Other" is selected */}
        {diagnosisValue === "Other" && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Additional Diagnosis Information:</Text>
            <TextInput
              style={styles.textInput}
              value={additionalDiagnosis}
              onChangeText={setAdditionalDiagnosis}
              placeholder="Enter additional diagnosis information"
            />
          </View>
        )}

        {/* Submit button */}
        <Pressable
          style={styles.submitButton}
          onPress={async () => {
            // Check that all fields are filled
            if (
              !firstNameValue ||
              !lastNameValue ||
              !dob ||
              !birthValue ||
              !raceValue ||
              !iscardiologistValue ||
              !CardiologistValue ||
              !zipCodeValue ||
              !diagnosisValue
            ) {
              Alert.alert(
                "Error",
                "Please fill out all fields before submitting."
              );
              return;
            }

            // Navigate to second register screen and pass all data to that screen
            navigation.navigate("Register2", {
              first_name: firstNameValue,
              last_name: lastNameValue,
              dob: dob,
              sex: birthValue,
              race: raceValue,
              isCardiologist: iscardiologistValue,
              cardiologist: CardiologistValue,
              zipcode: zipCodeValue,
              diagnosis: diagnosisValue,
              additional_diagnosis:
                diagnosisValue === "Other" ? additionalDiagnosis : null,
            });
          }}
        >
          <Text style={styles.submitButtonText}>Next</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    height: 40,
    backgroundColor: "#fff",
  },
  iconContainer: {
    padding: 8,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  submitButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#001f54",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Register1;
