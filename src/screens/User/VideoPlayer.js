import React, { useRef, useState, useEffect } from "react"; // Import necessary hooks and components from React.
import RNFS from "react-native-fs"; // Import the file system library for React Native.
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from "react-native"; // Import necessary components from react-native.
import Video from "react-native-video"; // Import the Video component from react-native-video.
import Orientation from "react-native-orientation-locker"; // Import the Orientation locker library.
import {
  getVideoMetadata,
  saveVideoMetadata,
} from "../../cache/MetadataHandler"; // Import functions to handle video metadata.
import { downloadVideo } from "../../cache/DownloadVideo"; // Import function to download video.

/**
 * VideoPlayerScreen Component
 * 
 * This component displays a video player screen, fetching and playing video content based on the provided video ID and URL.
 * It handles video caching, downloading, and fullscreen mode.
 * 
 * @param {object} props - The component props.
 * @param {object} props.route - The route object provided by React Navigation, containing parameters passed to this screen.
 * 
 * @returns {JSX.Element} The VideoPlayerScreen component.
 */
const VideoPlayerScreen = ({ route }) => {
  const { videoId, title, description, url } = route.params; // Destructure videoId, title, description, and url from route params.
  const videoRef = useRef(null); // Create a ref for the video component.
  const [videoPath, setVideoPath] = useState(null); // State to hold the local video path.
  const [loading, setLoading] = useState(true); // State to control the loading indicator.
  const [isFullScreen, setIsFullScreen] = useState(false); // State to control fullscreen mode.

  // useEffect hook to fetch video data when videoId or url changes.
  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true); // Set loading to true while fetching data.
      console.log(`Fetching video for ID: ${videoId}`);

      const metadata = await getVideoMetadata(videoId); // Get video metadata from cache.
      if (metadata) {
        console.log(`Found metadata for video ID ${videoId}:`, metadata);
      } else {
        console.log(`No metadata found for video ID ${videoId}`);
      }

      if (metadata && (await RNFS.exists(metadata.path))) {
        // Check if the video exists at the cached path.
        console.log(`Video exists at path: ${metadata.path}`);
        setVideoPath(metadata.path); // Set the video path from metadata.
      } else {
        console.log(`Downloading video from URL: ${url}`);
        const downloadedPath = await downloadVideo(url, videoId); // Download the video.

        if (downloadedPath) {
          console.log(`Downloaded video to path: ${downloadedPath}`);
          await saveVideoMetadata(videoId, downloadedPath); // Save the downloaded video metadata.
          setVideoPath(downloadedPath); // Set the video path to the downloaded path.
        } else {
          console.log(`Failed to download video for URL: ${url}`);
        }
      }
      setLoading(false); // Set loading to false after fetching data.
    };

    fetchVideo(); // Call the fetchVideo function.
  }, [videoId, url]); // Dependency array to run the effect when videoId or url changes.

  // Function to handle entering fullscreen mode.
  const onEnterFullScreen = () => {
    setIsFullScreen(true); // Set fullscreen state to true.
    Orientation.lockToLandscape(); // Lock the screen to landscape orientation.
    StatusBar.setHidden(true); // Hide the status bar.
  };

  // Function to handle exiting fullscreen mode.
  const onExitFullScreen = () => {
    setIsFullScreen(false); // Set fullscreen state to false.
    Orientation.lockToPortrait(); // Lock the screen to portrait orientation.
    StatusBar.setHidden(false); // Show the status bar.
  };

  return (
    // ScrollView component to allow vertical scrolling of the content.
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display the video title */}
      <Text style={styles.title}>{title}</Text>

      {/* Video container with conditional styling based on fullscreen state */}
      <View
        style={isFullScreen ? styles.fullScreenVideo : styles.videoContainer}
      >
        {loading ? (
          // Display loading indicator while loading
          <ActivityIndicator size="large" color="#0000ff" />
        ) : videoPath ? (
          // Display the video player if the video path is available
          <Video
            ref={videoRef}
            source={{ uri: videoPath }} // Use the cached file path
            style={isFullScreen ? styles.fullScreenVideo : styles.video}
            controls={true} // Show video controls
            resizeMode="contain" // Contain the video within the player
            onError={(error) => {
              console.log("Video error:", error);
            }}
            onBuffer={() => {
              console.log("Video buffering...");
            }}
            onFullscreenPlayerWillPresent={onEnterFullScreen} // Handle entering fullscreen mode
            onFullscreenPlayerWillDismiss={onExitFullScreen} // Handle exiting fullscreen mode
          />
        ) : (
          // Display error message if video failed to load
          <Text>Failed to load video</Text>
        )}
      </View>
      {/* Display the video description */}
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
};

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allow the container to grow to fit the content
    alignItems: "center", // Center the content horizontally
    padding: 16, // Add padding around the container
  },
  title: {
    fontSize: 24, // Set the font size of the title
    fontWeight: "bold", // Make the title bold
    marginBottom: 8, // Add bottom margin
  },
  description: {
    fontSize: 16, // Set the font size of the description
    marginBottom: 16, // Add bottom margin
  },
  videoContainer: {
    width: "100%", // Set the width of the video container to 100%
    aspectRatio: 16 / 9, // Set the aspect ratio for the video container
  },
  fullScreenVideo: {
    position: "absolute", // Position the fullscreen video absolutely
    top: 0, // Set the top position to 0
    left: 0, // Set the left position to 0
    right: 0, // Set the right position to 0
    bottom: 0, // Set the bottom position to 0
    backgroundColor: "black", // Set the background color to black
    zIndex: 9999, // Set the z-index to ensure it is on top
  },
  video: {
    width: "100%", // Set the width of the video to 100%
    height: "100%", // Set the height of the video to 100%
  },
});

export default VideoPlayerScreen; // Export the VideoPlayerScreen component as the default export
