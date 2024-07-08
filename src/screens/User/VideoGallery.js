import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

const logo = require("../../images/play_button.jpg");

const VideoGallery = ({ route, navigation }) => {
  const [videoPosts, setVideoPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type, age, subCategory } = route.params;

  useEffect(() => {
    const fetchVideoPosts = async () => {
      try {
        let ptype =
          type === "psu" ? "PSU Heart Information" : "CHD Educational Videos";
        let agegroup;

        if (age === "adult") {
          agegroup = "Adult";
        } else if (age === "transition") {
          agegroup = "Transition";
        } else {
          agegroup = "Child and Peds";
        }

        const snapshot = await firestore()
          .collection("Categories")
          .doc(ptype)
          .collection(agegroup)
          .doc(subCategory)
          .collection("VideoPost")
          .get();

        const videos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setVideoPosts(videos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video posts: ", error);
        setLoading(false);
      }
    };

    fetchVideoPosts();
  }, [type, age, subCategory]);

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
    <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.title}>{video.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-between",
  },
  itemContainer: {
    width: Dimensions.get("window").width / 2 - 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: 150,
    width: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: 10, // Rounded bottom corners for the image
    borderBottomRightRadius: 10, // Rounded bottom corners for the image
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
    paddingHorizontal: 10,
  },
});

export default VideoGallery;
