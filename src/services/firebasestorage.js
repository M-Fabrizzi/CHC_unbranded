import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import CategoryContext from "../context/categoryContext";
import uuid from "react-native-uuid";

export const uploadVideo = async (
  localUri,
  fileName,
  description,
  category,
  thumbnail,
  videoType,
  ageGroup
) => {
  try {
    const response = await fetch(localUri);
    console.log("got response");
    const blob = await response.blob();
    console.log("got blob", blob);
    const uid = uuid.v4();

    // Reference to the specific bucket
    const storageRef = storage()
      .refFromURL("gs://chc-app-cd5bd.appspot.com")
      .child(`videos/${uid}`);
    console.log(storageRef);
    await storageRef.putFile(localUri);
    console.log("put video in storage");
    try {
      // Upload completed successfully, now get the download URL
      const downloadURL = await storageRef.getDownloadURL();
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
      console.error("Error saving to Firestore:", error);
    }
  } catch (error) {
    console.error("Error uploading video:", error);
  }
};

export const deleteVideoinStorage = async (videoId) => {
  try {
    await storage()
      .refFromURL("gs://chc-app-cd5bd.appspot.com")
      .child(`videos/${videoId}`)
      .delete();
    console.log("Video deleted from storage");
  } catch (error) {
    console.error(error);
  }
};
