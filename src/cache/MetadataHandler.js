// MetadataHandler.js
import RNFS from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const METADATA_KEY_PREFIX = "video_metadata_";

// get video metadata based on videoId
export const getVideoMetadata = async (videoId) => {
  try {
     // get metadata from AsyncStorage using the given key
    const metadata = await AsyncStorage.getItem(METADATA_KEY_PREFIX + videoId);
    // analyze and return metadata if exists, otherwise return null
    return metadata ? JSON.parse(metadata) : null;
  } catch (error) {
    // handle errors during AsyncStorage access
    console.error("Failed to get video metadata:", error);
    return null;
  }
};

// save video metadata to AsyncStorage
export const saveVideoMetadata = async (videoId, path) => {
  try {
    // create metadata object with a path and current timestamp
    const metadata = { path, timestamp: new Date().toISOString() };
   // save the metadata to AsyncStorage under the given key
    await AsyncStorage.setItem(
      METADATA_KEY_PREFIX + videoId,
      JSON.stringify(metadata)
    );
  } catch (error) {
    // Handle errors during AsyncStorage access
    console.error("Failed to save video metadata:", error);
  }
};
