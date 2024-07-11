// CacheHandler.js
import RNFS from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const METADATA_KEY_PREFIX = "video_metadata_";

// Function to delete cached video
export const deleteCachedVideo = async (videoId) => {
  try {
    // Retrieve metadata for the video from AsyncStorage
    const metadata = await AsyncStorage.getItem(METADATA_KEY_PREFIX + videoId);
    // If metadata exists for the video
    if (metadata) {
      // analyze metadata to get the video path
      const { path } = JSON.parse(metadata);
      if (await RNFS.exists(path)) {
        // If the video file exists, unlink/delete it
        await RNFS.unlink(path);
        console.log(`Deleted cached video at path: ${path}`);
      }
      // Remove the metadata entry from AsyncStorage
      await AsyncStorage.removeItem(METADATA_KEY_PREFIX + videoId);
      // Log a message confirming metadata deleted
      console.log(`Deleted metadata for video ID: ${videoId}`);
    }
    // Catch and log any errors during the deletion process
  } catch (error) {
    console.error("Failed to delete cached video:", error);
  }
};
