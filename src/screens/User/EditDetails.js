import React, { useContext, useState } from "react"; // Import necessary hooks and components from React.
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Dimensions
} from "react-native"; // Import necessary components from react-native.
import { Dropdown } from "react-native-element-dropdown"; // Import the Dropdown component.
import DateTimePicker from "@react-native-community/datetimepicker"; // Import the DateTimePicker component.
import dayjs from "dayjs"; // Import the dayjs library for date formatting.
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons.
import { diagnosis, raceData } from "../allthedata"; // Import diagnosis and raceData from a local module.
import AuthContext from "../../context/authContext"; // Import AuthContext for authentication.
import UserDataContext from "../../context/userContext"; // Import UserDataContext for user data.
import { updateUserData } from "../../services/firebasefirestore"; // Import the updateUserData function from a service.
import DoctorContext from "../../context/doctorContext"; // Import DoctorContext for doctor data.

/**
 * EditDetails Component
 * 
 * This component allows users to edit their personal details, including name, 
 * date of birth, assigned sex at birth, race, cardiologist information, zip code, 
 * and diagnosis. It includes validation and updates the user data in Firebase Firestore.
 * 
 * @param {object} props - The component props.
 * @param {object} props.navigation - The navigation object provided by React Navigation for navigating between screens.
 * 
 * @returns {JSX.Element} The EditDetails component.
 */

const { width } = Dimensions.get("window");


function EditDetails({ navigation }) {
  const { userData, setUserData } = useContext(UserDataContext); // Destructure userData and setUserData from UserDataContext.
  const { user, setUser } = useContext(AuthContext); // Destructure user and setUser from AuthContext.

  // State variables to hold user input values.
  const [firstNameValue, setFirstNameValue] = useState(userData.first_name);
  const [lastNameValue, setLastNameValue] = useState(userData.last_name);
  const [diagnosisValue, setDiagnosisValue] = useState(userData.diagnosis);
  const [additionalDiagnosis, setAdditionalDiagnosis] = useState(userData.additional_diagnosis);
  const [raceValue, setRaceValue] = useState(userData.race);
  const [birthValue, setBirthValue] = useState(userData.sex);
  const [iscardiologistValue, setIsCardiologistValue] = useState(userData.isCardiologist);
  const [CardiologistValue, setCardiologistValue] = useState(userData.cardiologist);
  const [isFocus, setIsFocus] = useState(false);
  const [zipCode, setzipCode] = useState(userData.zipcode);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dob, setDob] = useState(userData.dob);
  const { doctors } = useContext(DoctorContext); // Destructure doctors from DoctorContext.

  // Function to handle date change from DateTimePicker.
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false); // Hide the DateTimePicker.
    setDate(currentDate); // Update the date state.
    setDob(dayjs(currentDate).format("YYYY-MM-DD")); // Format and set the date of birth.
  };

  // Function to show the DateTimePicker.
  const showDatepicker = () => {
    setShow(true);
  };
  console.log(userData);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name:                                                                                                </Text>
          <TextInput
            style={styles.textInput}
            value={firstNameValue}
            onChangeText={setFirstNameValue}
            placeholder="Enter first name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.textInput}
            value={lastNameValue}
            onChangeText={setLastNameValue}
            placeholder="Enter last name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth:</Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.textInput}
              value={dob}
              placeholder="YYYY-MM-DD"
              editable={true} // Make the text input editable.
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={showDatepicker}
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
            onChange={onChange}
          />
        )}

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
              setBirthValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

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
              setRaceValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Zip Code:</Text>
          <TextInput
            style={styles.textInput}
            value={zipCode}
            onChangeText={setzipCode}
            placeholder="Zip Code"
          />
        </View>

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
              setDiagnosisValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
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

        <Pressable
          style={styles.submitButton}
          onPress={async () => {
            if (
              !firstNameValue ||
              !lastNameValue ||
              !dob ||
              !birthValue ||
              !raceValue ||
              !zipCode ||
              !diagnosisValue
            ) {
              Alert.alert(
                "Error",
                "Please fill out all fields before submitting."
              );
              return;
            }
            // Update user data in Firebase Firestore.
            await updateUserData(user.uid, {
              first_name: firstNameValue,
              last_name: lastNameValue,
              dob: dob,
              sex: birthValue,
              race: raceValue,
              zipcode: zipCode,
              diagnosis: diagnosisValue,
              additional_diagnosis: diagnosisValue === "Other" ? additionalDiagnosis : null,
            });
            navigation.navigate("Home"); // Navigate back to the Home screen.
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 14, 
    backgroundColor: "#f8f9fa",
    alignItems: "center", 
  },
  inputContainer: {
    marginBottom: 20, 
  },
  label: {
    marginBottom: 8,
    marginTop: 5,
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
    width: "100%", 
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

export default EditDetails; // Export the EditDetails component as the default export
