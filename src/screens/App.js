import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Importing Ionicons
import auth from "@react-native-firebase/auth";

import EditDetails from "./EditDetails";
import Login from "./Login";
import Register1 from "./Register1";
import Register2 from "./Register2";
import HomePage from "./HomePage";
import NotificationsScreen from "./NotificationsScreen";
import AddVideo from "./AddVideo";
import VideoGallery from "./VideoGallery";
import VideoPlayerScreen from "./VideoPlayer";
import AdminHomeScreen from "./AdminHomeScreen";
import AdminNotification from "./AdminNotification";
import VideoHome from "./VideoHome";
import NewCategoryScreen from "./NewCategoryScreen";
import ContactInfoScreen from "./ContactInfoScreen";
import AdminManageNotifications from "./AdminManageNotifications";
import AgeCategories from "./AgeCategories";
import SubCategories from "./SubCategories";

import DeleteCategory from "./DeleteCategory";

import AuthContext, { AuthProvider } from "../context/authContext";
import { UserDataProvider } from "../context/userContext";
import { CategoryProvider } from "../context/categoryContext";
import ManageVideos from "./ManageVideos";
import EditDoctorsScreen from "./EditDoctors";
import { DoctorProvider } from "../context/doctorContext";

import AgeClassification from "./AgeClassification";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <DoctorProvider>
        <UserDataProvider>
          <CategoryProvider>
            <NavigationContainer>
              <AuthContext.Consumer>
                {({ user, setUser }) => {
                  const handleLogout = async () => {
                    try {
                      await auth().signOut();
                      setUser(null);
                    } catch (error) {
                      console.error(error);
                    }
                  };

                  const isAdmin = user?.uid === "DMKClrz8iXb0WxVSV64x3J8vj6j1";

                  return (
                    <Stack.Navigator>
                      {!user ? (
                        <>
                          <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ title: "Login" }}
                          />
                          <Stack.Screen
                            name="Register1"
                            component={Register1}
                            options={{ title: "Register1" }}
                          />
                          <Stack.Screen
                            name="Register2"
                            component={Register2}
                            options={{ title: "Register2" }}
                          />
                          {/* <Stack.Screen
                            name="Home"
                            component={HomePage}
                            options={{
                              title: "Home Page",
                              headerRight: () => (
                                <Button onPress={handleLogout} title="Logout" />
                              ),
                            }}
                          />
                          <Stack.Screen
                            name="AdminHome"
                            component={AdminHomeScreen}
                            options={{
                              title: "Admin Home",
                              headerRight: () => (
                                <Button onPress={handleLogout} title="Logout" />
                              ),
                            }}
                          /> */}
                        </>
                      ) : isAdmin ? (
                        <>
                          <Stack.Screen
                            name="AdminHome"
                            component={AdminHomeScreen}
                            options={{
                              title: "Admin Home",
                              headerRight: () => (
                                <Button onPress={handleLogout} title="Logout" />
                              ),
                            }}
                          />
                          <Stack.Screen
                            name="AgeClassification"
                            component={AgeClassification}
                            options={({ navigation }) => ({
                              title: "Age Classification",
                            })}
                          />
                          <Stack.Screen
                            name="ManageVideos"
                            component={ManageVideos}
                            options={({ navigation }) => ({
                              title: "Manage Videos",
                            })}
                          />
                          <Stack.Screen
                            name="AdminNotifications"
                            component={AdminNotification}
                            options={({ navigation }) => ({
                              title: "Admin Notifications",
                            })}
                          />
                          <Stack.Screen
                            name="AdminManageNotifications"
                            component={AdminManageNotifications}
                            options={({ navigation }) => ({
                              title: "Manage Notifications",
                            })}
                          />
                          <Stack.Screen
                            name="NewCategory"
                            component={NewCategoryScreen}
                            options={({ navigation }) => ({
                              title: "New Video Category",
                            })}
                          />
                          <Stack.Screen
                            name="DeleteCategory"
                            component={DeleteCategory}
                            options={({ navigation }) => ({
                              title: "Delete Category",
                            })}
                          />
                          <Stack.Screen
                            name="AddVideo"
                            component={AddVideo}
                            options={({ navigation }) => ({
                              title: "Add Video",
                            })}
                          />
                          <Stack.Screen
                            name="EditDoctors"
                            component={EditDoctorsScreen}
                            options={{ title: "Edit Doctors" }}
                          />
                        </>
                      ) : (
                        <>
                          <Stack.Screen
                            name="Home"
                            component={HomePage}
                            options={{
                              title: "Home Page",
                              headerRight: () => (
                                <Button onPress={handleLogout} title="Logout" />
                              ),
                            }}
                          />
                          <Stack.Screen
                            name="VideoHome"
                            component={VideoHome}
                            options={({ navigation }) => ({
                              title: "Video Home",
                              headerRight: () => (
                                <Icon
                                  name="home"
                                  size={30}
                                  color="#000"
                                  onPress={() => navigation.navigate("Home")}
                                />
                              ),
                            })}
                          />
                          <Stack.Screen
                            name="AgeCategories"
                            component={AgeCategories}
                            options={({ navigation }) => ({
                              title: "Age Categories",
                              headerRight: () => (
                                <Icon
                                  name="home"
                                  size={30}
                                  color="#000"
                                  onPress={() => navigation.navigate("Home")}
                                />
                              ),
                            })}
                          />
                          <Stack.Screen
                            name="SubCategories"
                            component={SubCategories}
                            options={({ navigation }) => ({
                              title: "Subcategories",
                              headerRight: () => (
                                <Icon
                                  name="home"
                                  size={30}
                                  color="#000"
                                  onPress={() => navigation.navigate("Home")}
                                />
                              ),
                            })}
                          />
                          <Stack.Screen
                            name="Notifications"
                            component={NotificationsScreen}
                            options={({ navigation }) => ({
                              title: "Notifications",
                              headerRight: () => (
                                <Icon
                                  name="home"
                                  size={30}
                                  color="#000"
                                  onPress={() => navigation.navigate("Home")}
                                />
                              ),
                            })}
                          />
                          <Stack.Screen
                            name="Contact"
                            component={ContactInfoScreen}
                            options={({ navigation }) => ({
                              title: "Contact Info",
                              headerRight: () => (
                                <Icon
                                  name="home"
                                  size={30}
                                  color="#000"
                                  onPress={() => navigation.navigate("Home")}
                                />
                              ),
                            })}
                          />
                          <Stack.Screen
                            name="VideoGallery"
                            component={VideoGallery}
                            options={({ navigation }) => ({
                              title: "Video Gallery",
                              headerRight: () => (
                                <Icon
                                  name="home"
                                  size={30}
                                  color="#000"
                                  onPress={() => navigation.navigate("Home")}
                                />
                              ),
                            })}
                          />
                          <Stack.Screen
                            name="VideoPlayer"
                            component={VideoPlayerScreen}
                            options={({ navigation }) => ({
                              title: "Video Player",
                              headerRight: () => (
                                <Icon
                                  name="home"
                                  size={30}
                                  color="#000"
                                  onPress={() => navigation.navigate("Home")}
                                />
                              ),
                            })}
                          />
                          <Stack.Screen
                            name="EditDetails"
                            component={EditDetails}
                            options={({ navigation }) => ({
                              title: "Edit Details",
                              headerRight: () => (
                                <Icon
                                  name="home"
                                  size={30}
                                  color="#000"
                                  onPress={() => navigation.navigate("Home")}
                                />
                              ),
                            })}
                          />
                        </>
                      )}
                    </Stack.Navigator>
                  );
                }}
              </AuthContext.Consumer>
            </NavigationContainer>
          </CategoryProvider>
        </UserDataProvider>
      </DoctorProvider>
    </AuthProvider>
  );
};

export default App;
