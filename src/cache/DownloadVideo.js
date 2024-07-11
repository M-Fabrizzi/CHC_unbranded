// DownloadVideo.js
import RNFS from "react-native-fs";

// download a video from a URL to local storage
export const downloadVideo = async (url, videoId) => {
  // get the download path using the videoId in the Document Directory
  const downloadPath = `${RNFS.DocumentDirectoryPath}/${videoId}.mp4`;

  try {
    // start downloading the file from "url" to "downloadPath"
    const { promise } = RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadPath,
    });

    // wait for the download to complete
    await promise;

    // return the local path where video saved after downloading
    return downloadPath;
    // handles  errors that occur during the download process
  } catch (error) {
    console.error("Failed to download video:", error);
    return null; // return null if download fails
  }
};
