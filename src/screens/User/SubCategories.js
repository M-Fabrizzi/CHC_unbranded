import React, { useContext, useState, useEffect } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import CategoryContext from "../../context/categoryContext";

const logo = require("../../images/play_button.jpg");

const SubCategories = ({ route, navigation }) => {
  const { categories } = useContext(CategoryContext);
  const [subCategories, setSubCategories] = useState([]);
  const { type, age } = route.params;

  useEffect(() => {
    if (type && age) {
      const videoType = type.toLowerCase();
      const ageGroup = age.toLowerCase();
      const subCategories = categories[videoType][ageGroup];

      if (subCategories && Array.isArray(subCategories)) {
        setSubCategories(subCategories);
      } else {
        console.log("subCategories is not an array or is undefined");
      }
    }
  }, [type, age, categories]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {subCategories.map((subCategory, index) => (
          <View key={index} style={styles.itemContainer}>
            <Pressable
              style={[styles.item, styles.roundedEdges]}
              onPress={() => {
                navigation.navigate("VideoGallery", {
                  type,
                  age,
                  subCategory,
                });
              }}
            >
              <Image source={logo} style={styles.image} />
            </Pressable>
            <Text style={styles.name}>{subCategory}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
  itemContainer: {
    width: "50%", // Adjust the width as needed
    padding: 10,
  },
  item: {
    backgroundColor: "#EEEEEE",
    height: 150,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 10,
  },
  roundedEdges: {
    borderRadius: 15,
  },
});

export default SubCategories;
