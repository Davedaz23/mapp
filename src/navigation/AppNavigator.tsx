import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignupScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import DetailsScreen from '../screens/DetailsScreen';
import AppointmentsListScreen from '../screens/AppointmentListScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  Appointment: undefined;
  Details: undefined;
  AppointmentList: undefined;
  OtpVerification: { phone: string; confirmation: any };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Welcome', 
            headerStyle: { backgroundColor: '#FD5F20' }, // Your brand color
            headerTintColor: '#fff',
            headerTitleAlign: 'center'
          }} 
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="Appointment" component={AppointmentScreen} options={{ title: 'Book Appointment' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Appointment Details' }} />
        <Stack.Screen name="AppointmentList" component={AppointmentsListScreen} options={{ title: 'My Appointments' }} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} options={{ title: 'OTP Verification' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
