import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
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
} from "react-native";

import { passwordReset } from "../services/firebaseauth";

const logo = require("../images/logo.png");

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.image} resizeMode="contain" />
            <Text style={styles.text}>Congenital Heart Center{"\n"}</Text>
            <View style={styles.inputView}>
                <TextInput
                style={styles.input}
                placeholder="Account Email"
                value={email}
                onChangeText={setEmail}
                autoCorrect={false}
                autoCapitalize="none"
                accessibilityLabel="Forgot Password Email Input"
                />
            </View>
            <View style={styles.buttonView}>
                <Pressable
                style={styles.button}
                onPress={async () => {
                    try {
                        passwordReset(email);
                        Alert.alert("Password Reset Email Sent", "If you do not recieve it in the next 5 minutes, please ensure the email address is correct and try again.");
                    } catch (error) {
                        throw error;
                    }
                }}
                accessibilityLabel="Forgot Password Button"
                >
                <Text style={styles.buttonText}>Recover Password</Text>
                </Pressable>
            </View>
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

export default ForgotPassword;
