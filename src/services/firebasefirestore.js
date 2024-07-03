import firebase from "@react-native-firebase/app";

import firestore, { query } from "@react-native-firebase/firestore";
import { useNavigationBuilder } from "@react-navigation/native";
import { diagnosis } from "../screens/allthedata";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { parse } from "date-fns"; // Install date-fns if not already installed: npm install date-fns
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { TurboModuleRegistry } from "react-native";

const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = parse(dob, "yyyy-MM-dd", new Date()); // Use a flexible date format parser

  if (isNaN(birthDate.getTime())) {
    return null; // Handle invalid date format
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  const birthMonth = birthDate.getMonth();

  if (
    month < birthMonth ||
    (month === birthMonth && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const addUserData = async (uid, data) => {
  try {
    await firestore().collection("UserPost").doc(uid).set(data);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export const updateUserData = async (uid, data) => {
  try {
    await firestore().collection("UserPost").doc(uid).update(data);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export const deleteNotification = async (notifId, ageGroup, diagnosis) => {
  try {
    await firestore()
      .collection("NotificationPost")
      .doc(diagnosis)
      .collection(ageGroup)
      .doc(String(notifId))
      .delete();
  } catch (error) {
    console.error(error);
  }
};

export const addCategoryData = async (
  categoryData,
  selectedItems,
  selectedPublicity
) => {
  try {
    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
      return false;
    } else if (selectedPublicity === "1") {
      if (selectedItems.includes("1")) {
        await firestore()
          .collection("Categories")
          .doc("CHD Educational Videos")
          .collection("Child and Peds")
          .doc(categoryData.title)
          .set(categoryData);
      }
      if (selectedItems.includes("2")) {
        await firestore()
          .collection("Categories")
          .doc("CHD Educational Videos")
          .collection("Adult")
          .doc(categoryData.title)
          .set(categoryData);
      }
      if (selectedItems.includes("3")) {
        await firestore()
          .collection("Categories")
          .doc("CHD Educational Videos")
          .collection("Transition")
          .doc(categoryData.title)
          .set(categoryData);
      }

      alert("Category created successfully!");
      return true;
    } else if (selectedPublicity === "2") {
      if (selectedItems.includes("1")) {
        await firestore()
          .collection("Categories")
          .doc("PSU Heart Information")
          .collection("Child and Peds")
          .doc(categoryData.title)
          .set(categoryData);
      }
      if (selectedItems.includes("2")) {
        await firestore()
          .collection("Categories")
          .doc("PSU Heart Information")
          .collection("Adult")
          .doc(categoryData.title)
          .set(categoryData);
      }
      if (selectedItems.includes("3")) {
        await firestore()
          .collection("Categories")
          .doc("PSU Heart Information")
          .collection("Transition")
          .doc(categoryData.title)
          .set(categoryData);
      }
      alert("Category created successfully!");
      return true;
    }
  } catch (error) {
    console.error("Error creating category, please try again ", error);
    throw error;
  }
};






export const deleteCategory = async (videoType, ageGroup, category) => {
  try {
    let collectionRef = firestore().collection("Categories");

    if (videoType === "chd") {
      collectionRef = collectionRef.doc("CHD Educational Videos").collection(ageGroup);
    } else if (videoType === "psu") {
      collectionRef = collectionRef.doc("PSU Heart Information").collection(ageGroup);
    } else {
      throw new Error("Invalid videoType");
    }

    await collectionRef.doc(category).delete();
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};





export const addUserToNotif = async (email, diagnosis, ageGroup, notifId) => {
  try {
    let ageG = "";
    const age = calculateAge(ageGroup);
    console.log(age);
    if (age <= 14) {
      ageG = "Pediatric";
    } else if (age > 14 && age <= 17) {
      ageG = "Transition";
    } else {
      ageG = "Adult";
    }
    await firestore()
      .collection("NotificationPost")
      .doc(diagnosis)
      .collection(ageG)
      .doc(notifId)
      .update({ users: firestore.FieldValue.arrayUnion(email) });
  } catch (error) {
    console.log(error);
  }
};

export const pushNotificationtobulk = async (diagnoses, ages, data, navigation) => {
  try { 

    // Handle single or multiple values for diagnoses and ages gracefully
    diagnoses = Array.isArray(diagnoses) ? diagnoses : [diagnoses];
    ages = Array.isArray(ages) ? ages : [ages];

    if (diagnoses.length === 0 || ages.length === 0 || data.length === 0 ) {
      alert("Please fill in all fields.");
      return false;
    }
    else {
    // Iterate through each combination of diagnosis and age
    for (const diagnosis of diagnoses) {
      for (const age of ages) {
        await firestore()
          .collection("NotificationPost")
          .doc(diagnosis)
          .collection(age)
          .add({
            title: data.title,
            description: data.description,
          }); // Use set() for overwriting existing data (if needed)
          console.log("successful");
          Alert.alert("Response Recorded", "The notification has been sent");
          return true;
      }}
      
    }

    console.log("Documents successfully added!");
  } catch (error) {
    console.error("Error writing documents:", error);
    return true;
  }
};


export const pushNotificationtoindividual = async (email, data) => {
  try {

    if (email.length === 0 || data.length === 0) {
      Alert.alert("Empty fields", "Please fill in all the fields and try again");
      return false;
    }
    else {
      // Check if the user with the provided email exists in the database
      const userSnapshot = await firestore().collection("users").doc(email).get();
      if (!userSnapshot.exists) {
        Alert.alert("User not found", "User with this email does not exist in the database");
        return false;
      }

      const userId = userSnapshot.data().uid;

      await firestore()
        .collection("UserPost")
        .doc(userId)
        .collection("Notifications")
        .add(data);
      
      return true;
    }
  } catch (error) {
    console.error("Error writing documents:", error);
    return false;
  }
};
export const pushNotificationtouid = async (uid, data) => {
  try {
    await firestore()
      .collection("UserPost")
      .doc(uid)
      .collection("Notifications")
      .add(data);

    console.log("Documents successfully added!");
  } catch (error) {
    console.error("Error writing documents:", error);
  }
};
export const addUserToFirestore = async (uid, email) => {
  try {
    await firestore().collection("users").doc(email).set({
      uid: uid,
    });
    console.log("User added to Firestore");
  } catch (error) {
    console.error("Error adding user to Firestore: ", error);
  }
};

export const getNotifications = async (userData, userID) => {
  try {
    let agegroup = "";

    const age = calculateAge(userData.dob);
    console.log(age);
    if (age <= 14) {
      agegroup = "Pediatric";
    } else if (age > 14 && age <= 17) {
      agegroup = "Transition";
    } else {
      agegroup = "Adult";
    }
    let notifs = [];
    const querySnapshot_post = await firestore()
      .collection("NotificationPost")
      .doc(userData.diagnosis)
      .collection(agegroup)
      .get();
    querySnapshot_post.forEach((documentSnapshot) => {
      console.log("User ID: ", documentSnapshot.id, documentSnapshot.data());
      notifs.push(documentSnapshot);
    });

    const querySnapshot_solo = await firestore()
      .collection("UserPost")
      .doc(userID)
      .collection("Notifications")
      .get();

    querySnapshot_solo.forEach((documentSnapshot) => {
      console.log("User ID: ", documentSnapshot.id, documentSnapshot.data());
      notifs.push(documentSnapshot);
    });

    console.log("Document successfully read", notifs);
    return notifs;
  } catch (error) {
    console.error("Error writing document", error);
    return [];
  }
};

export const getAdminNotifications = async (agegroup, diagnoses) => {
  try {
    let notifs = [];

    for (const diagnosis of diagnoses) {
      for (const age of agegroup) {
        console.log(diagnosis, age);
        const querySnapshot = await firestore()
          .collection("NotificationPost")
          .doc(diagnosis)
          .collection(age)
          .get(); // Use set() for overwriting existing data (if needed)
        console.log(querySnapshot.docs);
        querySnapshot.forEach((documentSnapshot) => {
          console.log("hi", documentSnapshot);
          console.log(
            "User ID: ",
            documentSnapshot.id,
            documentSnapshot.data()
          );
          notifs.push(documentSnapshot);
        });
      }
    }

    console.log("Document successfully read", notifs);
    return notifs;
  } catch (error) {
    console.error("Error writing document", error);
    return [];
  }
};

export const addVideoData = async (videoData) => {
  try {
    await firestore().collection("VideoPost").add(videoData); // Correct usage of add
    console.log("Video data successfully added!");
  } catch (error) {
    console.error("Error adding video data: ", error);
  }
};

export const getVideosByCategory = async (videoType, ageGroup, category) => {
  try {
    console.log(
      `Fetching videos for videoType: ${videoType}, ageGroup: ${ageGroup}, category: ${category}`
    );
    const videos = [];
    const querySnapshot = await firestore()
      .collection("Categories")
      .doc(videoType)
      .collection(ageGroup)
      .doc(category)
      .collection("VideoPost")
      .get();

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }

    querySnapshot.forEach((doc) => {
      videos.push({ id: doc.id, ...doc.data() });
    });

    console.log("Fetched videos:", videos);
    return videos;
  } catch (error) {
    console.error("Error fetching videos: ", error);
    return [];
  }
};

export const deleteVideoById = async (
  videoType,
  ageGroup,
  category,
  videoId
) => {
  try {
    await firestore()
      .collection("Categories")
      .doc(videoType)
      .collection(ageGroup)
      .doc(category)
      .collection("VideoPost")
      .doc(videoId)
      .delete();
    console.log(`Video with ID ${videoId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting video:", error);
  }
};


export const addDoctor = async (name) => {
  try {
    await firestore().collection("Doctors").add({
      name: name,
    });
    console.log(`Doctor ${name} added to Firestore`);
  } catch (error) {
    console.error("Error adding doctor to Firestore: ", error);
  }
};

export const deactivateDoctor = async (doctorIds) => {
  try {
    const doctorsCollection = firestore().collection("Doctors");

    for (const id of doctorIds) {
      const docRef = doctorsCollection.doc(id);
      const doc = await docRef.get();

      if (doc.exists) {
        const doctorName = doc.data().name;
        await docRef.update({
          name: `${doctorName} (Not Available)`,
        });
        console.log(`Doctor ${doctorName} marked as Not Available`);
      } else {
        console.log(`Doctor with ID ${id} not found in Firestore`);
      }
    }

    console.log('Doctors updated successfully');
  } catch (error) {
    console.error("Error updating doctor names in Firestore: ", error);
  }
};

// Function to fetch user data from Firestore
export const fetchUserData = async () => {
  console.log("fetchUserData: Function start");
  try {
    const userPosts = [];
    console.log("fetchUserData: Fetching documents from UserPost collection");

    const querySnapshot = await firestore().collection("UserPost").get();

    console.log("fetchUserData: Documents fetched, processing each document");
    querySnapshot.forEach((documentSnapshot) => {
      console.log(
        `fetchUserData: Processing document with ID ${documentSnapshot.id}`
      );
      userPosts.push({
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      });
    });

    console.log("fetchUserData: User data fetched successfully", userPosts);
    return userPosts;
  } catch (error) {
    console.error("fetchUserData: Error fetching user data", error);
    return [];
  }
};

// Usage example
fetchUserData().then((userData) => {
  console.log("fetchUserData: Fetched user data", userData);
});
