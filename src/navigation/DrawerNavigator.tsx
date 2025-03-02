import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Header from '../screens/Header';// Adjust the import path
// import DetailsScreen from './DetailsScreen'; // Import your other screens

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Header} />
        {/* <Drawer.Screen name="Details" component={DetailsScreen} /> */}
        {/* Add more screens here */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;