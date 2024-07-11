import React from 'react'; // Import the React library to use React components.
import { View, Text, Pressable, StyleSheet } from 'react-native'; // Import necessary components from react-native.

/**
 * AgeCategories Component
 * 
 * This component renders a screen with three buttons, each representing an age category.
 * When a button is pressed, it navigates to the "SubCategories" screen, passing the selected
 * age category and the choice parameter received from the previous screen.
 * 
 * @param {object} props - The component props.
 * @param {object} props.route - The route object provided by React Navigation, containing parameters passed to this screen.
 * @param {object} props.navigation - The navigation object provided by React Navigation for navigating between screens.
 * 
 * @returns {JSX.Element} The AgeCategories component.
 */
const AgeCategories = ({ route, navigation }) => {
  // Destructure the 'choice' parameter from the route params.
  const { choice } = route.params;

  return (
    // View component to hold all the child components and style the layout.
    <View style={styles.container}>
      {/* Text component to display the main heading */}
      <Text style={styles.Text}>Select an Age Group:</Text>

      {/* Pressable component for the Child/Pediatric category button */}
      <Pressable
        // Define the action to be taken on button press
        onPress={() => {
          // Navigate to the "SubCategories" screen, passing 'child and peds' as the age category
          navigation.navigate("SubCategories", { type: choice, age: 'child and peds' });
        }}
        // Apply styles to the button
        style={styles.submitButton}
      >
        {/* Text component to display the button label */}
        <Text style={styles.submitButtonText}>Child/Pediatric</Text>
      </Pressable>

      {/* Pressable component for the Transition category button */}
      <Pressable
        // Define the action to be taken on button press
        onPress={() => {
          // Navigate to the "SubCategories" screen, passing 'transitional' as the age category
          navigation.navigate("SubCategories", { type: choice, age: 'transitional' });
        }}
        // Apply styles to the button
        style={styles.submitButton}
      >
        {/* Text component to display the button label */}
        <Text style={styles.submitButtonText}>Transition</Text>
      </Pressable>

      {/* Pressable component for the Adult category button */}
      <Pressable
        // Define the action to be taken on button press
        onPress={() => {
          // Navigate to the "SubCategories" screen, passing 'adult' as the age category
          navigation.navigate("SubCategories", { type: choice, age: 'adult' });
        }}
        // Apply styles to the button
        style={styles.submitButton}
      >
        {/* Text component to display the button label */}
        <Text style={styles.submitButtonText}>Adult</Text>
      </Pressable>
    </View>
  );
};

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    flexDirection: 'column' 
  },
  Text: {
    marginTop: -50, 
    textAlign: "center", 
    fontWeight: "bold", 
    fontSize: 23, 
    width: 300, 
    marginBottom: 40, 
  },
  submitButtonText: {
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
  },
  submitButton: {
    width: "90%", 
    height: 50,
    paddingVertical: 15, 
    backgroundColor: "#001f54", 
    borderRadius: 8, 
    alignItems: "center", 
    marginBottom: 15,
  },
});

// Export the AgeCategories component as the default export
export default AgeCategories;