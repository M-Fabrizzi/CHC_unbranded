import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const AgeCategories = ({ route, navigation }) => {
  const { choice } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Select an Age Group:</Text>

      <Pressable
        onPress={() => {
          navigation.navigate("SubCategories", { type: choice, age: 'child and peds' });
        }}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Child/Pediatric</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate("SubCategories", { type: choice, age: 'transitional' });
        }}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Transition</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate("SubCategories", { type: choice, age: 'adult' });
        }}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Adult</Text>
      </Pressable>
    </View>
  );
};

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
    marginBottom: 15, // Added margin bottom to create space between buttons
  },
});

export default AgeCategories;
