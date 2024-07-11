import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import CategoryContext from "../context/categoryContext";
import uuid from "react-native-uuid";

// Function to upload a video to Firebase Storage and save its metadata to Firestore
export const uploadVideo = async (
  localUri, // Local URI of the video file
  fileName, // Name of the video file
  description, // Description of the video
  category, // Categories associated with the video
  thumbnail, // Thumbnail image URL for the video
  videoType, // Type of the video
  ageGroup // Age group for which the video is suitable
) => {
  try {
    // Fetch the video file from the local URI
    const response = await fetch(localUri);
    console.log("got response");

    // Convert the response to a blob
    const blob = await response.blob();
    console.log("got blob", blob);

    // Generate a unique ID for the video
    const uid = uuid.v4();

    // Reference to the specific bucket in Firebase Storage
    const storageRef = storage()
      .refFromURL("gs://chc-app-cd5bd.appspot.com")
      .child(`videos/${uid}`);
    console.log(storageRef);

    // Upload the video file to Firebase Storage
    await storageRef.putFile(localUri);
    console.log("put video in storage");

    try {
      // Get the download URL of the uploaded video
      const downloadURL = await storageRef.getDownloadURL();

      // Prepare the video data to be saved in Firestore
      const videoData = {
        name: fileName,
        url: downloadURL,
        timestamp: new Date(),
        desc: description,
        category: category,
        thumbnail: thumbnail,
        videoType: videoType,
        ageGroup: ageGroup,
      };

      // Save the video metadata to Firestore under each category
      for (let i = 0; i < category.length; i++) {
        const docRef = await firestore()
          .collection("Categories")
          .doc(videoType)
          .collection(ageGroup)
          .doc(category[i])
          .collection("VideoPost")
          .doc(uid)
          .set(videoData);
      }
    } catch (error) {
      // Handle errors while saving to Firestore
      console.error("Error saving to Firestore:", error);
    }
  } catch (error) {
    // Handle errors while uploading the video
    console.error("Error uploading video:", error);
  }
};

// Function to delete a video from Firebase Storage
export const deleteVideoinStorage = async (videoId) => {
  try {
    // Reference to the specific video in Firebase Storage
    await storage()
      .refFromURL("gs://chc-app-cd5bd.appspot.com")
      .child(`videos/${videoId}`)
      .delete();
    console.log("Video deleted from storage");
  } catch (error) {
    // Handle errors while deleting the video
    console.error(error);
  }
};
