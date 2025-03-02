import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { signUp } from '../services/authService';
import { User } from '../utils/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Formik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import Toast from 'react-native-toast-message'; // Import Toast
import { sendOtp } from '../services/authService'; // Import the sendOtp service

type OtpNavigationProp = StackNavigationProp<RootStackParamList, 'OtpVerification'>;

const SignUpScreen = () => {
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [status, setStatus] = useState<'active' | 'inActive' | 'suspended'>('inActive');
  const navigation = useNavigation<OtpNavigationProp>();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phone: Yup.string().required('Phone Number is required'),
  });

  const handleSignUp = async (values: any) => {
    const newUser: User = {
      id: '',
      name: values.name,
      email: values.email,
      role,
      profilePicture: '',
      phone: values.phone,
      status,
      createdAt: new Date().toISOString(),
    };

    try {
      const user = await signUp(values.email, values.password, newUser);
      if (user) {
        console.log('User signed up:', user);

        // Send OTP after successful signup
        await sendOtp(values.phone);  // Call the sendOtp function

        // Navigate to OTP verification screen
        navigation.navigate('OtpVerification', { phone: values.phone });
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: 'Failed to sign up. Please try again.',
        });
      }
    } catch (err) {
      if (err === 'auth/email-already-in-use') {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: 'This email is already associated with another account. Please use a different email.',
        });
      } else {
        console.error('An error occurred during sign-up', err);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: 'An error occurred during sign-up. Please try again.',
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          phone: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="black" // Set placeholder color to black
              value={values.name}
              onChangeText={handleChange('name')}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="black" // Set placeholder color to black
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="black" // Set placeholder color to black
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="black" // Set placeholder color to black
              value={values.phone}
              onChangeText={handleChange('phone')}
            />
            {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

            <View style={styles.roleContainer}>
              <Button title="Patient" onPress={() => setRole('patient')} />
              <Button title="Doctor" onPress={() => setRole('doctor')} />
            </View>

            <Button title="Sign Up" onPress={() => handleSubmit()} />
          </>
        )}
      </Formik>

      {/* Toast container for displaying messages */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 5, // Added border radius for better styling
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default SignUpScreen;
