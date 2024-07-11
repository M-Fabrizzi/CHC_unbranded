import React, { useEffect, useState } from "react"; // Import necessary hooks and components from React.
import {
  ScrollView,
  View,
  Image,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native"; // Import necessary components from react-native.
import firestore from "@react-native-firebase/firestore"; // Import Firestore from react-native-firebase.

const logo = require("../../images/play_button.jpg"); // Import the logo image.

/**
 * VideoGallery Component
 * 
 * This component fetches and displays a gallery of video posts based on the selected type, age group, and subcategory.
 * Users can tap on a video to navigate to the VideoPlayer screen.
 * 
 * @param {object} props - The component props.
 * @param {object} props.route - The route object provided by React Navigation, containing parameters passed to this screen.
 * @param {object} props.navigation - The navigation object provided by React Navigation for navigating between screens.
 * 
 * @returns {JSX.Element} The VideoGallery component.
 */
const VideoGallery = ({ route, navigation }) => {
  const [videoPosts, setVideoPosts] = useState([]); // State to hold the list of video posts.
  const [loading, setLoading] = useState(true); // State to control the loading indicator.
  const { type, age, subCategory } = route.params; // Destructure type, age, and subCategory from route params.

  // useEffect hook to fetch video posts when type, age, or subCategory changes.
  useEffect(() => {
    const fetchVideoPosts = async () => {
      try {
        // Determine the collection paths based on type and age group.
        let ptype = type === "psu" ? "PSU Heart Information" : "CHD Educational Videos";
        let agegroup;

        if (age === "adult") {
          agegroup = "Adult";
        } else if (age === "transition") {
          agegroup = "Transition";
        } else {
          agegroup = "Child and Peds";
        }

        // Fetch video posts from Firestore.
        const snapshot = await firestore()
          .collection("Categories")
          .doc(ptype)
          .collection(agegroup)
          .doc(subCategory)
          .collection("VideoPost")
          .get();

        // Map over the fetched documents and set the video posts state.
        const videos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setVideoPosts(videos); // Set the fetched video posts to the state.
        setLoading(false); // Set loading to false.
      } catch (error) {
        console.error("Error fetching video posts: ", error); // Log any errors.
        setLoading(false); // Set loading to false.
      }
    };

    fetchVideoPosts(); // Call the fetchVideoPosts function.
  }, [type, age, subCategory]); // Dependency array to run the effect when type, age, or subCategory changes.

  // Show loading indicator while fetching data.
  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    // ScrollView component to allow vertical scrolling of the content.
    <ScrollView contentContainerStyle={styles.container}>
      {/* Map over the videoPosts array and render each video post */}
      {/* Navigate to the VideoPlayer screen with the selected video's details.*/}
      {videoPosts.map((video, index) => (
        <Pressable
          key={index}
          style={styles.itemContainer}
          onPress={() => {
            navigation.navigate("VideoPlayer", {
              url: video.url,
              title: video.name,
              description: video.desc,
            }); 
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: video.thumbnail || logo }} 
              style={styles.image}
            />
          </View>
           {/* Display the video title */}
          <Text style={styles.title}>{video.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange children in a row
    flexWrap: "wrap", // Wrap the children to the next line
    padding: 10, // Add padding around the container
    justifyContent: "space-between", // Distribute children evenly with space between them
  },
  itemContainer: {
    width: Dimensions.get("window").width / 2 - 15, // Set the width of the item container to half the screen width minus some margin
    marginBottom: 20, // Add bottom margin
    borderRadius: 10, // Set the border radius for rounded corners
    backgroundColor: "#f0f0f0", // Set the background color
    overflow: "hidden", // Hide overflow content
  },
  imageContainer: {
    borderTopLeftRadius: 10, // Rounded top left corner for the image container
    borderTopRightRadius: 10, // Rounded top right corner for the image container
    overflow: "hidden", // Hide overflow content
  },
  image: {
    height: 150, // Set the height of the image
    width: "100%", // Set the width of the image to 100%
    resizeMode: "cover", // Cover the image to maintain aspect ratio
  },
  title: {
    textAlign: "center", // Center the text horizontally
    fontWeight: "bold", // Make the text bold
    fontSize: 14, // Set the font size of the text
    marginTop: 5, // Add top margin
    paddingHorizontal: 10, // Add horizontal padding
  },
});

export default VideoGallery; // Export the VideoGallery component as the default export
