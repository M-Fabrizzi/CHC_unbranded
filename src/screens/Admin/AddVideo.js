import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Dropdown } from "react-native-element-dropdown";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import firebase from "@react-native-firebase/app";
import { uploadVideo } from "../../services/firebasestorage";
import CategoryContext from "../../context/categoryContext";

const AddVideo = ({ navigation }) => {
  const [videoUri, setVideoUri] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoType, setVideoTypeValue] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const { categories } = useContext(CategoryContext);
  const [ageGroup, setAgeGroup] = useState(null);

  const handleChooseVideo = () => {
    const options = {
      mediaType: "video",
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled video picker");
      } else if (response.error) {
        console.log("VideoPicker Error: ", response.error);
      } else {
        setVideoUri(response.assets[0].uri);
        setThumbnail(response.assets[0].uri);
      }
    });
  };

  const handleUploadVideo = async () => {
    if (
      title &&
      description &&
      category.length > 0 &&
      videoUri &&
      ageGroup &&
      videoType
    ) {
      try {
        if (videoType == "psu") {
          await uploadVideo(
            videoUri,
            title,
            description,
            category,
            thumbnail,
            "PSU Heart Information",
            ageGroup
          );
          alert("Video uploaded successfully!");
          navigation.goBack(); // Navigate back after successful upload
        } else if (videoType == "chd") {
          await uploadVideo(
            videoUri,
            title,
            description,
            category,
            thumbnail,
            "CHD Educational Videos",
            ageGroup
          );
          alert("Video uploaded successfully!");
          navigation.goBack(); // Navigate back after successful upload
        }
      } catch (error) {
        alert("Failed to upload video. Please try again.");
        console.error("Error uploading video: ", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  useEffect(() => {
    if (videoType && ageGroup) {
      const type = videoType.toLowerCase();
      const age = ageGroup.toLowerCase();
      const subCategories = categories[type][age];

      if (subCategories && Array.isArray(subCategories)) {
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
        <TextInput
          style={styles.input}
          placeholder="Video Title:"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description:"
          value={description}
          onChangeText={setDescription}
          multiline
        />
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

        <View style={styles.thumbnailContainer}>
          <TextInput
            style={styles.thumbnailInput}
            placeholder="Choose Video"
            value={thumbnail ? "Video Selected" : ""}
            editable={false}
          />
          <TouchableOpacity
            style={styles.thumbnailButton}
            onPress={handleChooseVideo}
          >
            <MaterialIcons name="photo-library" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {thumbnail && (
          <Image source={{ uri: thumbnail }} style={styles.thumbnailImage} />
        )}
        <Pressable onPress={handleUploadVideo} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Upload</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: "#fff",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  textArea: {
    height: 100,
  },
  dropdown: {
    margin: 10,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    borderWidth: 2,
    borderColor: "#4287f5",
    borderRadius: 10,
    marginTop: 20,
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
  label: {
    marginBottom: 5,
  },
  thumbnailContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default AddVideo;
