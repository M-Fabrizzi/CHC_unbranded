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

import { passwordReset } from "../../services/firebaseauth"; // Import the password reset function from the firebaseauth service.

const logo = require("../../images/logo.png"); // Import the logo image.

/**
 * This screen allows the user to input their email and send an email that will allow them to reset their password.
 */

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState(""); // State to hold the email input.

  return (
    <SafeAreaView style={styles.container}>
      {/* Display the logo image */}
      <Image source={logo} style={styles.image} resizeMode="contain" />
      <Text style={styles.text}>Congenital Heart Center{"\n"}</Text>
      
      {/* Input container that allows the user to input their email */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Account Email"
          value={email} // Bind the email state to the TextInput value.
          onChangeText={setEmail} // Update the email state when the TextInput value changes.
          autoCorrect={false}
          autoCapitalize="none"
          accessibilityLabel="Forgot Password Email Input"
        />
      </View>

      {/* Button to trigger the password reset */}
      <View style={styles.buttonView}>
        <Pressable
          style={styles.button}
          onPress={async () => {
            try {
              // Call the password reset function which emails the user a password reset link.
              // It will not send out an email if there is no account matching the email inputted.
              passwordReset(email);
              Alert.alert(
                "Password Reset Email Sent",
                "If you do not receive it in the next 5 minutes, please ensure the email address is correct and try again."
              );
            } catch (error) {
              throw error; // Throw an error if something goes wrong.
            }
          }}
          accessibilityLabel="Forgot Password Button"
        >
          <Text style={styles.buttonText}>Recover Password</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

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
});

export default ForgotPassword; // Export the ForgotPassword component as the default export.
