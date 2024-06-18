import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { Provider, DefaultTheme, Menu, Button } from "react-native-paper";
import { diagnosis } from "./allthedata";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { pushNotification } from "../services/firebasefirestore";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee",
    accent: "#03dac4",
  },
};

const AdminNotification = ({ navigation }) => {
  const [ageGroupValue, setAgeGroupValue] = useState([]);
  const [diagnosisValue, setDiagnosisValue] = useState([]);
  const [notifTypeValue, setNotifTypeValue] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [researchPreset, onChangeResearch] = useState(
    "Your congenital heart team has identified you as someone potentially eligible for a current study being conducted on congenital heart disease. Would you like to be contacted about this study?"
  );
  const [cathPreset, onChangeCath] = useState(
    "You are scheduled for an upcoming heart catheterization at Penn State Health's Congenital Heart Center. Enclosed, you will find instructions for this procedure:"
  );
  const [surgeryPreset, onChangeSurgery] = useState(
    "You are scheduled for an upcoming heart surgery at Penn State Health's Congenital Heart Center. Enclosed, you will find instructions for this procedure:"
  );
  const [isResearch, setIsResearch] = useState(false);

  const handlepushNotification = async () => {
    try {
      await pushNotification(diagnosisValue, ageGroupValue, {
        title,
        description,
        isResearch,
      });
      console.log("successful");
      Alert.alert("Response Recorded", "The notification has been sent");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Provider theme={theme}>
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Title:"
            value={title}
            onChangeText={setTitle}
          />
          <Dropdown
            style={[styles.dropdown]}
            data={[
              { label: "Research", value: "1" },
              { label: "Catheterization", value: "2" },
              { label: "Surgery", value: "3" },
              { label: "Other", value: "4" },
            ]}
            labelField="label"
            valueField="value"
            placeholder={"Notification Type"}
            value={notifTypeValue}
            onChange={(item) => {
              setNotifTypeValue(item.value);
              if (item.value == "1") {
                setIsResearch(true);
                setDescription(researchPreset);
              } else if (item.value == "2") {
                setIsResearch(false);
                setDescription(cathPreset);
              } else if (item.value == "3") {
                setIsResearch(false);
                setDescription(surgeryPreset);
              } else {
                setIsResearch(false);
                setDescription("");
              }
            }}
          />
          <TextInput
            multiline
            style={styles.descInput}
            placeholder="Description:"
            value={description}
            onChangeText={setDescription}
          />

          <SectionedMultiSelect
            styles={{ selectToggle: styles.multiselect }}
            items={[
              { name: "Pediatric", id: "1" },
              { name: "Transition", id: "2" },
              { name: "Adult", id: "3" },
            ]}
            selectText="Age Group"
            uniqueKey="name"
            searchPlaceholderText={"Choose Age Group..."}
            IconRenderer={MaterialIcons}
            confirmText="Select"
            selectedItems={ageGroupValue}
            onSelectedItemsChange={setAgeGroupValue}
          />
          <SectionedMultiSelect
            styles={{ selectToggle: styles.multiselect }}
            items={diagnosis.map((item) => ({
              name: item.label,
              id: item.value,
            }))}
            selectText="Diagnosis"
            uniqueKey="name"
            searchPlaceholderText={"Choose diagnosis..."}
            IconRenderer={MaterialIcons}
            confirmText="Select"
            selectedItems={diagnosisValue}
            onSelectedItemsChange={setDiagnosisValue}
          />

          <TextInput
            style={styles.input}
            placeholder="Individual Patient Email (optional):"
          />

          <Button style={styles.uploadButton} onPress={handlepushNotification}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </Button>
        </View>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  descInput: {
    height: 120,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  multiselect: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#001f54",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
});

export default AdminNotification;
