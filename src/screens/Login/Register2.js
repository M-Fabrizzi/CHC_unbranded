import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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

import auth from "@react-native-firebase/auth";
import {
  addUserData,
  addUserToFirestore,
} from "../../services/firebasefirestore";

const logo = require("../../images/logo.png");

const sampleImage = require("../../images/video.jpg");

/**
 * Second register screen
 * Takes in params from Register1.
 * Takes email and password.
 * Posts user account to Firebase.
 */

function Register2({ route, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSignUp = async () => {
    try {
      //attempt to create a new user with given email and password
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      // User signed up successfully
      console.log("User signed up successfully:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      //if user with the same email already exists, user is not created
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "The email is already in use. Please try again.");
      } else {
        Alert.alert("Error", "Failed to sign up. Please try again.");
      }
    }
  };

  useEffect(() => {
    //check password strength and confirms that passwords are the same
    if (
      password.length >= 8 &&
      confirmPassword.length >= 8 &&
      password === confirmPassword &&
      email.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [password, confirmPassword, email]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      {/*input fields */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.buttonView}>
        {/*when pressed, signs user up through firebase */}
        <Pressable
          style={isDisabled ? styles.disabledButton : styles.button}
          onPress={async () => {
            const user = await handleSignUp();

            //if user exists, log them in and navigate to the home screen
            if (user) {
              const userid = user.uid;
              await addUserToFirestore(userid, email);
              await addUserData(userid, route.params);
              navigation.navigate("Home");
            }
          }}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>
      </View>
      <View>
        <Text>{"\n"}</Text>
      </View>
      {/*if the user has an account, they can navigate back to the login screen */}
      <Text style={styles.footerText}>Already have an Account?</Text>

      <View style={styles.buttonView}>
        <Pressable
          style={styles.registerButton}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>

      <View>
        <Text>{"\n"}</Text>
      </View>
      {/*shows TOS and privacy links */}
      <Text style={styles.footerText}>
        By clicking “Login” or “Register,” {"\n"}you agree to our
        <Text
          style={{ color: "blue" }}
          onPress={() =>
            Linking.openURL(
              "https://www.pennstatehealth.org/privacy-legal-notices"
            )
          }
        >
          {" Terms of Service "}
        </Text>
        and
        <Text
          style={{ color: "blue" }}
          onPress={() =>
            Linking.openURL(
              "https://www.pennstatehealth.org/sites/default/files/Privacy/561-103-Privacy-Notice-PSH-Rev-11-21.pdf"
            )
          }
        >
          {" Privacy Policy"}
        </Text>
        .
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
  },
  image: {
    height: 160,
    width: "100%",
  },
  sampleImage: {
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "#001E44",
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#001E44",
    borderWidth: 1,
    borderRadius: 7,
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: "red",
  },
  button: {
    backgroundColor: "#001E44",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#7a7a7a",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButton: {
    backgroundColor: "#96BEE6",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "gray",
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
});

export default Register2;
