import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  Pressable,
  StyleSheet,
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
      if (ageGroup === null || category.length === 0 || videoType === null) {
        Alert.alert("Please select Age group, Category, and Video type.");
        return;
      }

      const result = await confirmAndDeleteCategory(
        videoType,
        ageGroup,
        category[0]
      );

      if (result) {
        navigation.navigate("AdminHome");
        Alert.alert("Category was successfully deleted");
      } else {
        console.log("Category deletion cancelled");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      Alert.alert("Error", "Failed to delete category. Please try again.");
    }
  };

  useEffect(() => {
    if (videoType && ageGroup) {
      const type = videoType.toLowerCase();
      const age = ageGroup.toLowerCase();
      const subCategories = categories[type]?.[age] || [];

      if (Array.isArray(subCategories)) {
        const formattedSubCategories = subCategories.map((item) => ({
          name: item,
          id: item,
        }));
        setSubCategories(formattedSubCategories);
      } else {
        console.log("subCategories is not an array or is undefined");
      }
    }
  }, [videoType, ageGroup, categories]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: "Penn State", value: "psu" },
            { label: "CHD Education", value: "chd" },
          ]}
          labelField="label"
          valueField="value"
          placeholder="PSU/CHD Info"
          value={videoType}
          onChange={(item) => {
            console.log("Selected videoType:", item.value); // Log the selected value
            setVideoTypeValue(item.value);
          }}
        />
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
            setAgeGroup(item.value);
          }}
        />
        <SectionedMultiSelect
          items={subCategories}
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
      <Pressable style={styles.deleteButton} onPress={handleDeleteCategory}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </SafeAreaView>
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
    bottom: 50, // Adjust
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
