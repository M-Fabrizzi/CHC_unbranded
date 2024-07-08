import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/FontAwesome";
import { diagnosis, raceData } from "./allthedata";
import AuthContext from "../context/authContext";
import UserDataContext from "../context/userContext";
import { updateUserData } from "../services/firebasefirestore";
import DoctorContext from '../context/doctorContext';

function EditDetails({ navigation }) {
  const { userData, setUserData } = useContext(UserDataContext);
  const { user, setUser } = useContext(AuthContext);

  const [firstNameValue, setFirstNameValue] = useState(userData.first_name);
  const [lastNameValue, setLastNameValue] = useState(userData.last_name);
  const [diagnosisValue, setDiagnosisValue] = useState(userData.diagnosis);
  const [additionalDiagnosis, setAdditionalDiagnosis] = useState(
    userData.additional_diagnosis
  );
  const [raceValue, setRaceValue] = useState(userData.race);
  const [birthValue, setBirthValue] = useState(userData.sex);
  const [iscardiologistValue, setIsCardiologistValue] = useState(
    userData.isCardiologist
  );
  const [CardiologistValue, setCardiologistValue] = useState(
    userData.cardiologist
  );
  const [isFocus, setIsFocus] = useState(false);
  const [zipCode, setzipCode] = useState(userData.zipcode);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dob, setDob] = useState(userData.dob);
  const { doctors } = useContext(DoctorContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(dayjs(currentDate).format("YYYY-MM-DD"));
  };

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
              editable={true} // Make the text input non-editable
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
            if (!firstNameValue || !lastNameValue || !dob || !birthValue || !raceValue || !iscardiologistValue || !CardiologistValue || !zipCode || !diagnosisValue) {
                  Alert.alert("Error", "Please fill out all fields before submitting.");
                  return;
            }
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
              additional_diagnosis:
                diagnosisValue === "Other" ? additionalDiagnosis : null,
            });
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
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
    alignItems: 'center',
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

export default EditDetails;
