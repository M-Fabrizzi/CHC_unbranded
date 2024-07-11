import React from "react"; // Import the React library to use React components.
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Linking,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native"; // Import necessary components from react-native.

/**
 * ContactInfoScreen Component
 * 
 * This component displays contact information for the Congenital Heart Center, 
 * including phone numbers and addresses for various clinics, and provides functionality 
 * for making phone calls and opening addresses in maps.
 * 
 * @returns {JSX.Element} The ContactInfoScreen component.
 */
const ContactInfoScreen = () => {
  // Function to handle phone number press, initiates a phone call
  const handlePhonePress = (number) => {
    // Open the phone dialer with the provided number
    Linking.openURL(`tel:${number}`);
  };

  // Function to handle address press, opens the address in Google Maps
  const handleAddressPress = (address) => {
    // Construct the URL for Google Maps search with the provided address
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    // Open the URL in the browser
    Linking.openURL(url);
  };

  return (
    // ScrollView component to allow vertical scrolling of the content
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image component to display the logo */}
      <Image source={require("../../images/logo.png")} style={styles.logo} />
      {/* Text component to display the title */}
      <Text style={styles.title}>Congenital Heart Center Clinic List</Text>
      {/* Text component to display a section title */}
      <Text style={styles.sectionTitle}>Pediatric Cardiology/Congenital Heart Group</Text>
      {/* TouchableOpacity component to make the phone number pressable */}
      <TouchableOpacity onPress={() => handlePhonePress("+17175318909")}>
        {/* Text component to display the phone number */}
        <Text style={styles.phoneText}>Call to Schedule: +1 (717) 531-8909{"\n"}</Text>
      </TouchableOpacity>
      {/* Text component to display another section title */}
      <Text style={styles.sectionTitle}>Locations:</Text>

      {/* TouchableOpacity component to make the address pressable */}
      <TouchableOpacity onPress={() => handleAddressPress("121 Nyes Road Suite D Harrisburg, PA")}>
        {/* Text components to display the location name and address */}
        <Text style={styles.locationText}>PSH Specialty Clinic</Text>
        <Text style={styles.phoneText}>121 Nyes Road Suite D Harrisburg, PA{"\n"}</Text>
      </TouchableOpacity>

      {/* Another TouchableOpacity component for a different address */}
      <TouchableOpacity onPress={() => handleAddressPress("130 Leader Heights Rd York, PA")}>
        <Text style={styles.locationText}>PSH Pediatric Specialties Clinic</Text>
        <Text style={styles.phoneText}>130 Leader Heights Rd York, PA{"\n"}</Text>
      </TouchableOpacity>

      {/* Another TouchableOpacity component for a different address */}
      <TouchableOpacity onPress={() => handleAddressPress("1430 Harrisburg Pike Lancaster, PA")}>
        <Text style={styles.locationText}>PSH Children’s Lancaster Pediatric Center</Text>
        <Text style={styles.phoneText}>1430 Harrisburg Pike Lancaster, PA{"\n"}</Text>
      </TouchableOpacity>

      {/* Another TouchableOpacity component for a different address */}
      <TouchableOpacity onPress={() => handleAddressPress("655 Walnut St West Reading, PA")}>
        <Text style={styles.locationText}>PSH Pediatric Specialties Clinic</Text>
        <Text style={styles.phoneText}>655 Walnut St West Reading, PA{"\n"}</Text>
      </TouchableOpacity>

      {/* Another TouchableOpacity component for a different address */}
      <TouchableOpacity onPress={() => handleAddressPress("303 Benner Pike State College, PA")}>
        <Text style={styles.locationText}>PSH Medical Group</Text>
        <Text style={styles.phoneText}>303 Benner Pike State College, PA{"\n"}</Text>
      </TouchableOpacity>

      {/* Text component to display another section title */}
      <Text style={styles.sectionTitle}>Adult Congenital Heart Disease</Text>
      {/* TouchableOpacity component to make the phone number pressable */}
      <TouchableOpacity onPress={() => handlePhonePress("+18774677484")}>
        <Text style={styles.phoneText}>Call to Schedule (8am-5pm): +1 (877) 467-7484</Text>
      </TouchableOpacity>
      {/* TouchableOpacity component to make the phone number pressable */}
      <TouchableOpacity onPress={() => handlePhonePress("+17175316833")}>
        <Text style={styles.phoneText}>Pacemaker Clinic: +1 (717) 531-6833</Text>
      </TouchableOpacity>
      {/* TouchableOpacity component to make the phone number pressable */}
      <TouchableOpacity onPress={() => handlePhonePress("+1717531531")}>
        <Text style={styles.phoneText}>Anticoagulation Clinic: +1 (717) 531-531{"\n"}</Text>
      </TouchableOpacity>
      {/* View component to contain the portal link */}
      <View style={styles.portalContainer}>
        {/* Text component to display the portal title */}
        <Text style={styles.title}>Link to Penn State Health{"\n"}Electronic Medical Record</Text>
        {/* Pressable component to make the portal link pressable */}
        <Pressable
          onPress={() =>
            Linking.openURL(
              "https://www.pennstatehealth.org/patients-visitors/billing-medical-records/my-health-patient-portal"
            )
          }
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Go</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allow the container to grow to fit the content
    padding: 20, // Add padding around the container
    backgroundColor: "#fff", // Set the background color to white
  },
  logo: {
    width: 380, // Set the width of the logo
    height: 80, // Set the height of the logo
    alignSelf: "center", // Center the logo horizontally
    resizeMode: "contain", // Contain the image within the given width and height
  },
  title: {
    fontSize: 22, // Set the font size of the title
    fontWeight: "bold", // Make the title bold
    alignSelf: "center", // Center the title horizontally
    marginVertical: 10, // Add vertical margin to the title
  },
  phoneText: {
    fontSize: 16, // Set the font size of the phone text
    fontWeight: "bold", // Make the phone text bold
    marginBottom: 5, // Add bottom margin to the phone text
    color: "blue", // Set the text color to blue
  },
  sectionTitle: {
    fontSize: 18, // Set the font size of the section title
    fontWeight: "bold", // Make the section title bold
    marginVertical: 10, // Add vertical margin to the section title
  },
  locationText: {
    fontSize: 16, // Set the font size of the location text
    fontWeight: "bold", // Make the location text bold
    marginBottom: 5, // Add bottom margin to the location text
  },
  text: {
    fontSize: 16, // Set the font size of the general text
    marginBottom: 5, // Add bottom margin to the general text
  },
  submitButton: {
    width: "30%", // Set the button width to 30% of the container width
    height: 50, // Set the button height
    paddingVertical: 15, // Set the vertical padding
    backgroundColor: "#001f54", // Set the background color of the button
    borderRadius: 8, // Set the border radius for rounded corners
    alignItems: "center", // Center the text horizontally within the button
  },
  submitButtonText: {
    color: "white", // Set the text color to white
    fontSize: 18, // Set the font size of the button text
    fontWeight: "bold", // Make the button text bold
  },
  portalContainer: {
    flex: 1, // Allow the container to grow to fit the content
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    backgroundColor: "#fff", // Set the background color to white
  },
});

// Export the ContactInfoScreen component as the default export
export default ContactInfoScreen;
