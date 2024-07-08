import React, { useRef, useState, useEffect } from "react";
import RNFS from "react-native-fs";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from "react-native";
import Video from "react-native-video";
import Orientation from "react-native-orientation-locker";
import {
  getVideoMetadata,
  saveVideoMetadata,
} from "../../cache/MetadataHandler";
import { downloadVideo } from "../../cache/DownloadVideo";

const VideoPlayerScreen = ({ route }) => {
  const { videoId, title, description, url } = route.params;
  const videoRef = useRef(null);
  const [videoPath, setVideoPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      console.log(`Fetching video for ID: ${videoId}`);

      const metadata = await getVideoMetadata(videoId);
      if (metadata) {
        console.log(`Found metadata for video ID ${videoId}:`, metadata);
      } else {
        console.log(`No metadata found for video ID ${videoId}`);
      }

      if (metadata && (await RNFS.exists(metadata.path))) {
        console.log(`Video exists at path: ${metadata.path}`);
        setVideoPath(metadata.path);
      } else {
        console.log(`Downloading video from URL: ${url}`);
        const downloadedPath = await downloadVideo(url, videoId);

        if (downloadedPath) {
          console.log(`Downloaded video to path: ${downloadedPath}`);
          await saveVideoMetadata(videoId, downloadedPath);
          setVideoPath(downloadedPath);
        } else {
          console.log(`Failed to download video for URL: ${url}`);
        }
      }
      setLoading(false);
    };

    fetchVideo();
  }, [videoId, url]);

  const onEnterFullScreen = () => {
    setIsFullScreen(true);
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);
  };

  const onExitFullScreen = () => {
    setIsFullScreen(false);
    Orientation.lockToPortrait();
    StatusBar.setHidden(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View
        style={isFullScreen ? styles.fullScreenVideo : styles.videoContainer}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : videoPath ? (
          <Video
            ref={videoRef}
            source={{ uri: videoPath }} // Use the cached file path
            style={isFullScreen ? styles.fullScreenVideo : styles.video}
            controls={true}
            resizeMode="contain"
            onError={(error) => {
              console.log("Video error:", error);
            }}
            onBuffer={() => {
              console.log("Video buffering...");
            }}
            onFullscreenPlayerWillPresent={onEnterFullScreen}
            onFullscreenPlayerWillDismiss={onExitFullScreen}
          />
        ) : (
          <Text>Failed to load video</Text>
        )}
      </View>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  fullScreenVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    zIndex: 9999,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default VideoPlayerScreen;
