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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name:</Text>
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
              setIsCardiologistValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

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
              setCardiologistValue(item.value);
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
              !iscardiologistValue ||
              !CardiologistValue ||
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
              isCardiologist: iscardiologistValue,
              cardiologist: CardiologistValue,
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
    </SafeAreaView>
  );
}

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow the container to grow to fit the content
    padding: 14, // Add padding around the container
    backgroundColor: "#f8f9fa", // Set the background color
    alignItems: "center", // Center the content horizontally
  },
  inputContainer: {
    marginBottom: 20, // Add margin below each input container
  },
  label: {
    marginBottom: 8, // Add margin below the label
    marginTop: 5, // Add margin above the label
    fontSize: 16, // Set the font size of the label
    fontWeight: "bold", // Make the label text bold
    color: "#333", // Set the label text color
  },
  textInput: {
    flex: 1, // Allow the text input to grow to fit the width
    height: 40, // Set the height of the text input
    borderColor: "gray", // Set the border color
    borderWidth: 1, // Set the border width
    borderRadius: 8, // Set the border radius for rounded corners
    paddingHorizontal: 10, // Add horizontal padding
    backgroundColor: "#fff", // Set the background color
  },
  dateInputContainer: {
    flexDirection: "row", // Arrange children in a row
    alignItems: "center", // Center the content vertically
    borderRadius: 8, // Set the border radius for rounded corners
    height: 40, // Set the height
    backgroundColor: "#fff", // Set the background color
  },
  iconContainer: {
    padding: 8, // Add padding around the icon
  },
  dropdown: {
    height: 40, // Set the height of the dropdown
    borderColor: "gray", // Set the border color
    borderWidth: 1, // Set the border width
    borderRadius: 8, // Set the border radius for rounded corners
    paddingHorizontal: 10, // Add horizontal padding
    backgroundColor: "#fff", // Set the background color
    width: "100%", // Set the width to 100%
  },
  submitButton: {
    width: "100%", // Set the button width to 100% of the container width
    paddingVertical: 15, // Set the vertical padding
    backgroundColor: "#001f54", // Set the background color of the button
    borderRadius: 8, // Set the border radius for rounded corners
    alignItems: "center", // Center the text horizontally within the button
    marginBottom: 15, // Add bottom margin
  },
  submitButtonText: {
    color: "white", // Set the text color to white
    fontSize: 18, // Set the font size of the button text
    fontWeight: "bold", // Make the button text bold
  },
});

export default EditDetails; // Export the EditDetails component as the default export
