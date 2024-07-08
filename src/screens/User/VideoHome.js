import React, { useState } from "react";
import {
  View,
  Text,
  navigation,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { shadow } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const VideoHome = ({ navigation }) => {
  const handleIcon1Press = () => {
    console.log("Icon 1 pressed");
  };

  const handleIcon2Press = () => {
    console.log("Icon 2 pressed");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../images/VideoHomePSU.jpeg")}
        style={[styles.psuImage]}
      />
      <Text style={styles.Text}>
        Penn State Congenital Heart Center Information
      </Text>

      <Pressable
        onPress={() => {
          navigation.navigate("AgeCategories", { choice: "psu" });
        }}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Go</Text>
      </Pressable>

      <Image
        source={require("../../images/GlobeIcon.png")}
        style={[styles.GlobeImage]}
      />
      <Text style={styles.Text}>
        Congenital Heart Disease Educational Videos
      </Text>

      <Pressable
        onPress={() => {
          navigation.navigate("AgeCategories", { choice: "chd" });
        }}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Go</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  Text: {
    marginTop: -5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    width: 300,
    marginBottom: 100,
  },
  psuImage: {
    width: 175,
    height: 175,
    alignSelf: "center",
    marginBottom: 0,
    marginTop: 10,
  },
  GlobeImage: {
    width: 260,
    height: 180,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  submitButton: {
    width: "30%",
    height: 50,
    paddingVertical: 15,
    backgroundColor: "#001f54",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
    marginTop: -90,
  },
});

export default VideoHome;
