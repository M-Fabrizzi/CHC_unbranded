import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import {
  View,
  Text,
  navigation,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { launchImageLibrary } from "react-native-image-picker";
import { addCategoryData } from "../../services/firebasefirestore";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import firestore from "@react-native-firebase/firestore";

const { width } = Dimensions.get("window"); // Get window width

const NewCategoryScreen = ({ navigation }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedPublicity, setSelectedPublicity] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  // handle selecting a thumbnail picture
  const handleSelectThumbnail = () => {
    const options = {
      mediaType: "photo", // Only allow photo selection
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.assets && response.assets.length > 0) {
        setThumbnail(response.assets[0].uri); // Set picked image URI as thumbnail
      }
    });
  };

  // handle creating a new category
  const handleCreateCategory = async () => {
    try {
      if (!title.trim()) {
        Alert.alert("Error", "Please enter a title."); // Alert if title is empty
        return;
      }
      const categoryData = {
        title: title, // Category title
        thumbnail: thumbnail, // Category thumbnail image
      };

      const categoryId = await addCategoryData(
        categoryData,
        selectedItems,
        selectedPublicity
      ); // function to add category data
      if (categoryId) {
        navigation.navigate("AdminHome"); // Navigate to Admin Home when success
      }

      setTitle(""); // Clear title input
      setThumbnail(null); // Clear thumbnail 
    } catch (error) {
      console.error("Failed to create category: ", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Input for category title */}
      <TextInput
        style={styles.input}
        placeholder="Sub-Category Title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Dropdown for selecting publicity option */}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        data={[
          { label: "CHD Educational Videos", value: "1" },
          {
            label: "Penn State Congenital Heart Center Information",
            value: "2",
          },
        ]}
        labelField="label"
        valueField="value"
        placeholder={"Select an option"}
        value={selectedPublicity}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelectedPublicity(item.value); // Update selected publicity value
          setIsFocus(false);
        }}
      />

      {/* multi-select for selecting age group/categories */}
      <SectionedMultiSelect
        items={[
          { id: "1", name: "Child" },
          { id: "2", name: "Adult" },
          { id: "3", name: "Transition Education" },
        ]}
        uniqueKey="id"
        onSelectedItemsChange={setSelectedItems} // selected items change
        selectedItems={selectedItems}
        selectText="Age Group/Category"
        searchPlaceholderText="Choose Categories..."
        confirmText="Select"
        IconRenderer={MaterialIcons}
        styles={{
          selectToggle: styles.dropdown,
          chipText: styles.chipText,
          itemText: styles.itemText,
          subItemText: styles.subItemText,
          selectedItemText: styles.selectedItemText,
        }}
      />

{/* Container for thumbnail and selection */}
      <View style={styles.thumbnailContainer}>
        <TextInput
          style={styles.thumbnailInput}
          placeholder="Category Thumbnail"
          value={thumbnail}
          editable={false} // Thumbnail input not editable
        />
        <TouchableOpacity
          style={styles.thumbnailButton}
          onPress={handleSelectThumbnail} // Button to select thumbnail image
        >
          <MaterialIcons name="photo-library" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* Display selected thumbnail image */}
      {thumbnail && (
        <Image source={{ uri: thumbnail }} style={styles.thumbnailImage} />
      )}
      {/* Button to create new category */}
      <Pressable style={styles.createButton} onPress={handleCreateCategory}>
        <Text style={styles.createButtonText}>Create</Text>
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
  dropdown: {
    margin: 1,
    marginBottom: 12,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
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
  input: {
    width: width * 0.9,
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  thumbnailContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.9,
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  thumbnailInput: {
    flex: 1,
    height: "100%",
    borderColor: "transparent",
  },
  thumbnailButton: {
    marginLeft: 10,
  },
  thumbnailImage: {
    width: width * 0.9,
    height: 200,
    borderRadius: 10,
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
  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NewCategoryScreen;
