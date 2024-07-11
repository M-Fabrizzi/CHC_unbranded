import React, { useState } from 'react';
import { View, Text, navigation, StyleSheet, Pressable,  TextInput, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';



const PennAgeCategories = ({navigation}) => {

    
    
  return (
    <View style={styles.container}>
      
        <Text style={styles.Text}>Select an Age Group:</Text>
    
            
        <Pressable onPress={() => {navigation.navigate("VideoGallery");}} 
            style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Child/Pediatric</Text>
        </Pressable>

        <Text style={styles.Text}></Text>


        <Pressable onPress={() => {navigation.navigate("VideoGallery");}} 
            style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Transition</Text>
        </Pressable>

        <Text style={styles.Text}></Text>


        <Pressable onPress={() => {navigation.navigate("VideoGallery");}} 
            style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Adult</Text>
        </Pressable>
        <Text></Text>
    
      

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
    marginBottom: 80,

  },
  psuImage: {
    width: 175,
    height: 175,
    alignSelf: "center",
    marginBottom: 0,
    marginTop: 10,
    
  },
  GlobeImage: {
    width: 260,
    height: 180,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
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


}
    
});

    export default PennAgeCategories;