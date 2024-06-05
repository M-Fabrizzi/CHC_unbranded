import { StatusBar } from "expo-status-bar";

import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import EditDetails from "./EditDetails";
import Login from "./Login";
import Register1 from "./Register1";
import Register2 from "./Register2";
import HomePage from "./HomePage";
import NotificationsScreen from "./NotificationsScreen";

import VideoPlayerScreen from "./VideoPlayer";

import AdminHomeScreen from "./AdminHomeScreen";
import AdminNotification from "./AdminNotification";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="AdminNotifications"
          component={AdminNotification}
          options={{ title: "Admin Home" }}
        /> */}

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register1"
          component={Register1}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Register2"
          component={Register2}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "Home Page" }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ title: "Notifications" }}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayerScreen}
          options={{ title: "Video Player" }}
        />
        <Stack.Screen
          name="EditDetails"
          component={EditDetails}
          options={{ title: "Edit Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
