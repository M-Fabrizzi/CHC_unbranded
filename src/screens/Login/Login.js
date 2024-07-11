import { StatusBar } from "expo-status-bar"; // Import the StatusBar component from Expo.
import React, { useState, useContext } from "react"; // Import necessary hooks and components from React.
import {
  Alert,
  Button,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  Linking,
  TextInput,
  View,
} from "react-native"; // Import necessary components from react-native.

import { signIn } from "../../services/firebaseauth"; // Import the signIn function from the firebaseauth service.
import AuthContext from "../../context/authContext"; // Import the AuthContext to access authentication state.
import { createNotification } from "../../services/firebasefirestore"; // Import the createNotification function from the firebasefirestore service.

const logo = require("../../images/logo.png"); // Import the logo image.

/**
 * This is the primary login screen for the application.
 * If the user has an account, they can login here.
 * If not, they can navigate to the registration page instead.
 */

function Login({ navigation }) {
  const [username, setUsername] = useState(""); // State to hold the username input.
  const [password, setPassword] = useState(""); // State to hold the password input.
  const { setUser } = useContext(AuthContext); // Destructure setUser from AuthContext to update the user state.

  // Function to handle user sign-in.
  const handleSignIn = async () => {
    // Check if both username and password fields are filled.
    if (!username || !password) {
      Alert.alert("Validation Error", "Please enter both email and password.");
      return false;
    }

    try {
      // Check the credentials against the database. If valid, log the user in.
      const user = await signIn(username, password);
      setUser(user); // Update the user state.
      Alert.alert("Sign In Successful", `Welcome back, ${user.email}`);
      return user;
    } catch (error) {
      // If the credentials are invalid, show an alert.
      if (error.code === "auth/invalid-credential") {
        Alert.alert("Sign In Failed", "User not found. Please register.");
      } else {
        Alert.alert("Sign In Failed", error.message);
      }
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Display the logo image */}
      <Image source={logo} style={styles.image} resizeMode="contain" /> 
      <Text style={styles.text}>Congenital Heart Center{"\n"}</Text>
      
      {/* Username and password input fields */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username} // Bind the username state to the TextInput value.
          onChangeText={setUsername} // Update the username state when the TextInput value changes.
          autoCorrect={false}
          autoCapitalize="none"
          accessibilityLabel="Email Input"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password} // Bind the password state to the TextInput value.
          onChangeText={setPassword} // Update the password state when the TextInput value changes.
          autoCorrect={false}
          autoCapitalize="none"
          accessibilityLabel="Password Input"
        />
      </View>

      {/* Navigate to forgot password screen */}
      <Text
        style={styles.forgotText}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        Forgot Password?
      </Text>

      <View style={styles.buttonView}>
        {/* Attempt to log the user into the app. Also checks if the user is an admin or not */}
        <Pressable
          style={styles.button}
          onPress={async () => {
            const signInSuccess = await handleSignIn();

            if (signInSuccess) {
              navigation.navigate(
                // If the user's uid matches the admin uid, navigate to admin home. Otherwise, navigate to the user homepage.
                signInSuccess.uid === "DMKClrz8iXb0WxVSV64x3J8vj6j1"
                  ? "AdminHome"
                  : "Home"
              );
            }
          }}
          accessibilityLabel="Login Button"
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
      
      <View>
        <Text>{"\n"}</Text>
      </View>
      <Text style={styles.footerText}>Don't Have Account?</Text>
      <View style={styles.buttonView}>
        {/* Navigate to the register screen */}
        <Pressable
          style={styles.registerButton}
          onPress={() => navigation.navigate("Register1")}
          accessibilityLabel="Register Button"
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
      
      <View>
        <Text>{"\n"}</Text>
      </View>

      {/* Links to PSU resources about privacy and TOS */}
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

// Define the styles for the components.
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
  },
  image: {
    height: 160,
    width: "100%",
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
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
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
  text: {
    color: "#001E44",
    fontSize: 28,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
  forgotText: {
    color: "#001E44",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "left",
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginRight: 50,
  },
});

export default Login; // Export the Login component as the default export.
