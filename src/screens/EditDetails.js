import {React, useContext, useState } from "react";
import {
  createContext,
  SafeAreaView,
  View,
  Text,
  TextInput,
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
import { diagnosis, doctors, raceData } from "./allthedata";
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../services/UserContext';

// export const getDetails = async (uid, data) => {
//   const user = await firestore().collection('UserPost').doc(uid).get(data);
// }

function EditDetails({ navigation }) {
  const { user } = useContext(UserContext);
  const [firstNameValue, setFirstNameValue] = useState(user.first_name);
  const [lastNameValue, setLastNameValue] = useState(user.first_name);
  const [diagnosisValue, setDiagnosisValue] = useState(user.diagnosis);
  const [additionalDiagnosis, setAdditionalDiagnosis] = useState(null);
  const [zipCodeValue, setZipCodeValue] = useState(user.zipcode)
  const [raceValue, setRaceValue] = useState(null);
  const [birthValue, setbirthValue] = useState(null);
  const [iscardiologistValue, setIsCardiologistValue] = useState(null);
  const [CardiologistValue, setCardiologistValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dob, setDob] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(dayjs(currentDate).format("YYYY-MM-DD"));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.textInput}
            value={firstNameValue}
            onChangeText={setFirstNameValue}
            placeholder="First Name:"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.textInput}
            value={user.last_name}
            onChangeText={setLastNameValue}
            placeholder="Last Name:"
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
              { label: "Male", value: "1" },
              { label: "Female", value: "2" },
              { label: "Rather not answer", value: "3" },
            ]}
            labelField="label"
            valueField="value"
            placeholder={"Select an option"}
            value={birthValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setbirthValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select race:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={raceData}
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
              { label: "Yes", value: "1" },
              { label: "No", value: "2" },
              { label: "I'd rather not answer", value: "3" },
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
            data={doctors}
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
            value={zipCodeValue}
            onChangeText={setZipCodeValue}
            placeholder="Zip Code"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Diagnosis:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={diagnosis}
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
        {diagnosisValue === "16" && (
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

        <Pressable style={styles.submitButton} onPress={() => { navigation.navigate("Home"); }}>
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditDetails;
