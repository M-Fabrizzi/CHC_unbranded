import React, { useContext, useState, useEffect } from "react";
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(false);

  const handleChooseVideo = () => {
    const options = {
      mediaType: "video",
    };
    console.log("reached choose video");
    //User selects video from photo library to upload
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled video picker");
      } else if (response.errorCode) {
        console.log("VideoPicker Error: ", response.errorMessage);
        Alert.alert("Video upload error. Please ensure that you are using a .mp4 video.")
      } else if (response.assets && response.assets.length > 0) {
        const selectedVideo = response.assets[0];
        //ensures video seected is an .mp4 video 
        if (selectedVideo.uri.endsWith(".mp4")) {
          setVideoUri(selectedVideo.uri);
          setThumbnail(selectedVideo.uri);
        } else {
          Alert.alert("Please select a .mp4 video.");
        }
      } else {
        Alert.alert("Failed to select a video. Please try again.");
      }
    });

    console.log("pick video");
  };

  const handleUploadVideo = async () => {
    console.log(videoUri);
    // check if all fields are filled
    if (
      title &&
      description &&
      category.length > 0 &&
      videoUri &&
      ageGroup &&
      videoType
    ) {
      setLoading(true);
       // determine the type of video (PSU or CHD) 
      try {
     // uploads video to PSU category
        if (videoType === "psu") {
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
          // uploads video to CHD category
        } else if (videoType === "chd") {
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
          navigation.goBack(); 
          // Navigate back to previous screen after successful upload
        }
        //handles any errors during the upload
      } catch (error) {
        alert("Failed to upload video. Please try again.");
        console.error("Error uploading video: ", error);
      } finally {
        setLoading(false);
      }
      //alerts user to fil lin all fields if any are empty
    } else {
      alert("Please fill in all fields.");
    }
  };

  useEffect(() => {
    if (videoType && ageGroup) {
       // Convert videoType and ageGroup to lowercase
      const type = videoType.toLowerCase();
      const age = ageGroup.toLowerCase();
      // Retrieve the subcategories based on the selected videoType and ageGroup
      const subCategories = categories[type][age];

      if (subCategories && Array.isArray(subCategories)) {
        // Format the categories into objects with name and id 
        const formattedSubCategories = subCategories.map((item) => ({
          name: item,
          id: item,
        }));
        // Update the subCategories with the formatted subcategories
        setSubCategories(formattedSubCategories);
        // Log an error if subCategories is not an array or is undefined
      } else {
        console.log("subCategories is not an array or is undefined");
      }
    }
  }, [videoType, ageGroup, categories]);

  return (
    <ScrollView style={styles.container}>
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
            //populate setAgeGroup with selected choice
            setAgeGroup(item.value);
          }}
        />
        <SectionedMultiSelect
        //populates multiselect with array from subCategories
          items={subCategories}
          uniqueKey="id"
          onSelectedItemsChange={setCategory} //populate setCategory with selected choices
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
            onPress={handleChooseVideo}>
            <MaterialIcons name="photo-library" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {thumbnail && (
          <Image source={{ uri: thumbnail }} style={styles.thumbnailImage} />
        )}
        <Pressable onPress={handleUploadVideo} style={styles.submitButton}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Upload</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
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
