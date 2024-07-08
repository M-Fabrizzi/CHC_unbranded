import React from "react";
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  onPressFunction,
} from "react-native";

const HomePage = ({ navigation }) => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "black" : "white",
    flex: 1,
    padding: 20,
    marginTop: -7,
  };

  const textStyle = {
    color: isDarkMode ? "white" : "black",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  };

  const navigationText = {
    color: isDarkMode ? "white" : "black",
    fontSize: 18,
    textAlign: "center",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={backgroundStyle}>
        <View style={{ alignItems: "center", marginBottom: 9 }}>
          <Image
            source={require("../../images/image2.png")}
            style={{ width: 380, height: 80 }}
          />
        </View>

        <Pressable
          onPress={() => {
            navigation.navigate("VideoHome");
          }}
        >
          <Image
            source={require("../../images/box2.png")}
            style={[styles.navigationImage, styles.roundedEdges]}
          />
          <Text style={styles.centeredBoldText}>Video Gallery</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("EditDetails");
          }}
        >
          <Image
            source={require("../../images/box1.png")}
            style={[styles.navigationImage, styles.roundedEdges]}
          />
          <Text style={styles.centeredBoldText}>Edit Personal Info</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Image
            source={require("../../images/box3.png")}
            style={[styles.navigationImage, styles.roundedEdges]}
          />
          <Text style={styles.centeredBoldText}>Notifications</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Contact");
          }}
        >
          <Image
            source={require("../../images/box4.png")}
            style={[styles.navigationImage, styles.roundedEdges]}
          />
          <Text style={styles.centeredBoldText}>Contact</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  navigationImage: {
    width: 200,
    height: 88,
    alignSelf: "center",
    marginBottom: 20,
  },
  roundedEdges: {
    borderRadius: 10,
  },

  centeredBoldText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
    marginTop: -20,
  },
});

export default HomePage;
