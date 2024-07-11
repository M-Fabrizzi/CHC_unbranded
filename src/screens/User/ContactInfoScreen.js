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
    flexGrow: 1,
    padding: 20, 
    backgroundColor: "#fff", 
  },
  logo: {
    width: 380, 
    height: 80, 
    alignSelf: "center", 
    resizeMode: "contain", 
  },
  title: {
    fontSize: 22, 
    fontWeight: "bold", 
    alignSelf: "center", 
    marginVertical: 10, 
  },
  phoneText: {
    fontSize: 16,
    fontWeight: "bold", 
    marginBottom: 5, 
    color: "blue", 
  },
  sectionTitle: {
    fontSize: 18, 
    fontWeight: "bold", 
    marginVertical: 10, 
  },
  locationText: {
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 5, 
  },
  text: {
    fontSize: 16, 
    marginBottom: 5, 
  },
  submitButton: {
    width: "30%", 
    height: 50, 
    paddingVertical: 15, 
    backgroundColor: "#001f54", 
    borderRadius: 8, 
    alignItems: "center", 
  },
  submitButtonText: {
    color: "white", 
    fontSize: 18, 
    fontWeight: "bold", 
  },
  portalContainer: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff", 
  },
});

// Export the ContactInfoScreen component as the default export
export default ContactInfoScreen;
