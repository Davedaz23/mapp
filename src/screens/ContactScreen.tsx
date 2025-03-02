import React from "react";
import { View, Text, TouchableOpacity, Linking, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Contact: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <Image
          source={require('../assets/med.jpg')}
          style={styles.heroImage}
        />
        <Text style={styles.heroTitle}>Welcome to Our Appointment Booking App</Text>
        <Text style={styles.heroSubtitle}>Book appointments with doctors in just a few clicks!</Text>
      </View>

      <Text style={styles.subHeader}>
        We'd love to hear from you! Reach out through any of the channels below.
      </Text>

      <View style={styles.contactItem}>
        <Icon name="envelope" size={24} color="#000" />
        <TouchableOpacity onPress={() => Linking.openURL("mailto:contact@example.com")}>
          <Text style={styles.linkText}>amanwase@care4u.com</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactItem}>
        <Icon name="phone" size={24} color="#000" />
        <TouchableOpacity onPress={() => Linking.openURL("tel:+1234567890")}>
          <Text style={styles.linkText}>+25196063990</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={() => Linking.openURL("#")}>
          <Icon name="facebook" size={32} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("#")}>
          <Icon name="twitter" size={32} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("#")}>
          <Icon name="instagram" size={32} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("#")}>
          <Icon name="linkedin" size={32} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: 300,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align items to the top
    alignItems: "center", // Keep items centered horizontally
    backgroundColor: "#F5F5F5",
    padding: 2,
  },
  subHeader: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  linkText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#007BFF",
  },
  socialIcons: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "60%",
  },
});

export default Contact;