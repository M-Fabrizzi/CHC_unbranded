import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CategoryContext from "../../context/categoryContext";
import {
  getVideosByCategory,
  deleteVideoById,
} from "../../services/firebasefirestore";
import { deleteVideoinStorage } from "../../services/firebasestorage";
import { deleteCachedVideo } from "../../cache/CacheHandler"; // Import the cache handler

const { width } = Dimensions.get("window");

const ManageVideos = ({ navigation }) => {
  const [videoType, setVideoTypeValue] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);
  const [category, setCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const { categories } = useContext(CategoryContext);

  useEffect(() => {
    console.log("Categories context:", categories);
    if (videoType && ageGroup) {
      const type =
        videoType.toLowerCase() === "psu heart information" ? "psu" : "chd";
      const age = ageGroup.toLowerCase();

      // Check if categories[type] and categories[type][age] are defined
      console.log(type, age);

      if (categories[type] && categories[type][age]) {
        const subCategories = categories[type][age];

        if (Array.isArray(subCategories)) {
          const formattedSubCategories = subCategories.map((item) => ({
            name: item,
            id: item,
          }));
          setSubCategories(formattedSubCategories);
        } else {
          console.log("subCategories is not an array or is undefined");
        }
      } else {
        console.log(
          `Categories for type "${type}" and age "${age}" are not defined`
        );
      }
    }
  }, [videoType, ageGroup, categories]);

  const handleFetchVideos = async () => {
    if (videoType && ageGroup && category.length > 0) {
      console.log(
        `Fetching videos for videoType: ${videoType}, ageGroup: ${ageGroup}, category: ${category[0]}`
      );
      const fetchedVideos = await getVideosByCategory(
        videoType,
        ageGroup,
        category[0]
      );
      console.log("Fetched videos:", fetchedVideos);
      if (fetchedVideos.length === 0) {
        alert("No videos found");
      } else {
        setVideos(fetchedVideos);
      }
    } else {
      alert("Please select all filters.");
    }
  };

  const handleDeleteVideo = async (video) => {
    Alert.alert(
      "Delete Video",
      "Are you sure you want to delete this video?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            console.log(category);
            await deleteVideoById(videoType, ageGroup, category[0], video.id);
            if (video.category.length == 1) {
              await deleteVideoinStorage(video.id);
              await deleteCachedVideo(video.id);
            }
            // Delete the cached video
            Alert.alert("Success", "Video deleted successfully");
            handleFetchVideos(); // Refresh the list after deletion
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: "Penn State", value: "PSU Heart Information" },
            { label: "CHD Education", value: "CHD Educational Videos" },
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
        <TouchableOpacity
          style={styles.fetchButton}
          onPress={handleFetchVideos}
        >
          <Text style={styles.fetchButtonText}>Fetch Videos</Text>
        </TouchableOpacity>
        <FlatList
          data={videos}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.videoItem}>
              <Text style={styles.videoName}>{item.name}</Text>
              <Text style={styles.videoDesc}>{item.desc}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteVideo(item)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    margin: 10,
    width: "95%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
  },
  fetchButton: {
    width: "95%",
    paddingVertical: 15,
    backgroundColor: "#001f54",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  fetchButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  videoItem: {
    width: width - 40,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  videoName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  videoDesc: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ManageVideos;
