import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  Pressable,
  StyleSheet,
  ScrollView
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CategoryContext from "../../context/categoryContext";
import { deleteCategory } from "../../services/firebasefirestore";
import { confirmAndDeleteCategory } from "../../services/firebasefirestore";

const DeleteCategory = ({ navigation }) => {
  const [category, setCategory] = useState([]);
  const [videoType, setVideoTypeValue] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const { categories } = useContext(CategoryContext);
  const [ageGroup, setAgeGroup] = useState(null);

  const handleDeleteCategory = async () => {
    try {
      // Check if all fields are populated
      if (ageGroup === null || category.length === 0 || videoType === null) {
        Alert.alert("Please select Age group, Category, and Video type.");
        return;
      }
      // Call confirmAndDeleteCategory to delete the category
      const result = await confirmAndDeleteCategory(
        videoType,
        ageGroup,
        category[0]
      );

      if (result) {
        navigation.navigate("AdminHome"); // navigate to AdminHome after deletion sucess 
        Alert.alert("Category was successfully deleted");
      } else {
        console.log("Category deletion cancelled");
      }
      //Catches any errors that occur during the deletion
    } catch (error) {
      console.error("Error deleting category:", error);
      Alert.alert("Error", "Failed to delete category. Please try again.");
    }
  };

  useEffect(() => {
     // Update subCategories when videoType or ageGroup change
    if (videoType && ageGroup) {
      const type = videoType.toLowerCase(); //converts type and age to lowercase for consistency 
      const age = ageGroup.toLowerCase();
      const subCategories = categories[type]?.[age] || [];

      // Format subCategories if its an array
      if (Array.isArray(subCategories)) {
        const formattedSubCategories = subCategories.map((item) => ({
          name: item,
          id: item,
        }));
        // Set formatted subCategories in state
        setSubCategories(formattedSubCategories);
      } else {
        console.log("subCategories is not an array or is undefined");
      }
    }
  }, [videoType, ageGroup, categories]); // Run useEffect when videoType, ageGroup, or categories change

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Dropdown for selecting video type */}
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: "CHD Education", value: "chd" },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Category Type"
          value={videoType}
          onChange={(item) => {
            console.log("Selected videoType:", item.value); // Log the selected value
            setVideoTypeValue(item.value);  // update state with selected video type
          }}
        />
        {/* Dropdown for selecting age group */}
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: "Child/Pediatric", value: "Child and Peds" },
            { label: "Transitional", value: "Transitional" },
            { label: "Adult", value: "Adult" },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Age Group"
          value={ageGroup}
          onChange={(item) => {
            setAgeGroup(item.value); // update state with selected age group
          }}
        />
        {/* SectionedMultiSelect for selecting categories */}
        <SectionedMultiSelect
          items={subCategories} //populates options with subCategories array
          uniqueKey="id"
          onSelectedItemsChange={setCategory}
          selectedItems={category}
          selectText="Category"
          searchPlaceholderText="Choose Categories..."
          confirmText="Select"
          styles={{ selectToggle: styles.dropdown }}
          IconRenderer={MaterialIcons}
        />
      </View>
      {/* Delete button to handle category deletion */}
      <Pressable style={styles.deleteButton} onPress={handleDeleteCategory}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  dropdown: {
    margin: 10,
    marginTop: 10,
    width: "95%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  deleteButton: {
    width: "90%",
    paddingVertical: 15,
    backgroundColor: "#ff0000",
    borderRadius: 12,
    alignItems: "center",
    bottom: 50,
    marginLeft: 19,
    marginTop: 70,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DeleteCategory;
