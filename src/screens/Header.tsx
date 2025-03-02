import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, TouchableWithoutFeedback, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

const Header = () => {
  const [searchVal, setSearchVal] = useState(''); // State to filter the hospital list
  const [filteredHospitals, setFilteredHospitals] = useState([]); // State for filtered hospitals
  const [isMenuVisible, setIsMenuVisible] = useState(false); // State to manage menu visibility
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Hospital data
  const hospitalList = [
    { id: 1, name: "Bethzatha-General-Hospital", role: "Founded in May 2007...", img: "https://example.com/Bethzatha-General-Hospital.jpg" },
    { id: 2, name: "Hayat-Hospital", role: "A Norwegian facility...", img: "https://example.com/Hayat-Hospital.jpg" },
    { id: 3, name: "Kadisco-General-Hospital", role: "Established in 1996...", img: "https://example.com/Kadisco-General-Hospital.jpg" },
    { id: 4, name: "Landmark-General-Hospital", role: "Founded in 2008...", img: "https://example.com/Landmark-General-Hospital.jpg" },
    { id: 5, name: "Samaritan-Surgical-Center", role: "Known for providing high-standard care...", img: "https://example.com/Samaritan-Surgical-Center.jpg" },
    { id: 6, name: "Nordic-Medical-Centre", role: "A Norwegian facility...", img: "https://example.com/Nordic-Medical-Centre.jpg" },
    { id: 7, name: "Myungsung-Christian-Medical-Center", role: "Surgical Care, Endoscopic Surgery...", img: "https://example.com/Myungsung-Christian-Medical-Center.jpg" },
  ];

  // Handle search input change
  // const handleSearchClick = (text) => {
  //   setSearchVal(text);
  //   if (text === "") {
  //     setFilteredHospitals([]); // Reset the results if search is empty
  //     return;
  //   }
  //   const filtered = hospitalList.filter((hospital) =>
  //     hospital.name.toLowerCase().includes(text.toLowerCase())
  //   );
  //   setFilteredHospitals(filtered); // Update the filtered list
  // };

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Close menu when clicking outside
  const closeMenu = () => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.container}>
        <View style={styles.branding}>
          {/* Hamburger Menu on the Left */}
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerIcon}>
            <Icon name="bars" size={25} color="black" />
          </TouchableOpacity>

          {/* Title on the Right */}
          <View style={styles.logoContainer}>
            <Text style={styles.sitename}>care4you</Text>
          </View>
        </View>

        {/* Search Input */}
        {/* <TextInput
          style={styles.searchInput}
          placeholder="Search Hospitals"
          value={searchVal}
          onChangeText={handleSearchClick}
        /> */}

        {/* Dropdown Menu as a Modal */}
        <Modal
          visible={isMenuVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeMenu} // Handle back button
        >
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.navItem} onPress={() => { navigation.navigate('Details'); closeMenu(); }}>
              <Text>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => { navigation.navigate('Details'); closeMenu(); }}>
              <Text>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => { navigation.navigate('Details'); closeMenu(); }}>
              <Text>Hospitals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => { navigation.navigate('Details'); closeMenu(); }}>
              <Text>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => { navigation.navigate('Details'); closeMenu(); }}>
              <Text>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => { navigation.navigate('Details'); closeMenu(); }}>
              <Text>Registration</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => { navigation.navigate('Details'); closeMenu(); }}>
              <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => { navigation.navigate('Details'); closeMenu(); }}>
              <Text>Settings</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Display filtered hospitals if available */}
        {/* {filteredHospitals.length > 0 && (
          <FlatList
            data={filteredHospitals}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.hospitalItem}>
                <Text style={styles.hospitalName}>{item.name}</Text>
                <Text style={styles.hospitalRole}>{item.role}</Text>
                <Image source={{ uri: item.img }} style={styles.hospitalImage} />
              </View>
            )}
          />
        )} */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60, // Reduced height for the app bar
    paddingHorizontal: 10,
    backgroundColor: 'lightblue', // Change the background color for visibility
    flexDirection: 'column',
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%', // Ensure branding takes full height of the container
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sitename: {
    fontSize: 18, // Slightly smaller font size
    fontWeight: 'bold',
    marginLeft: 10,
  },
  hamburgerIcon: {
    padding: 10,
  },
  searchInput: {
    height: 30, // Reduced height for the search input
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50, // Adjust this value to position the dropdown below the hamburger menu
    left: 10, // Align with the left side (hamburger menu)
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1, // Ensure the dropdown is above other elements
  },
  navItem: {
    paddingVertical: 10,
  },
  hospitalItem: {
    marginVertical: 10,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hospitalRole: {
    fontSize: 14,
    color: '#666',
  },
  hospitalImage: {
    width: 100,
    height: 100,
    marginTop: 5,
  },
});

export default Header;