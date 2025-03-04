import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ConfirmationResult } from 'firebase/auth'; // Import Firebase type

type OtpNavigationProp = StackNavigationProp<RootStackParamList, 'OtpVerification'>;

const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const navigation = useNavigation<OtpNavigationProp>();
  const { phone, confirmation } = route.params as { phone: string; confirmation: ConfirmationResult };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError('OTP cannot be empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Verify OTP using Firebase confirmation result
      const credential = await confirmation.confirm(otp);
      
      if (credential.user) {
        console.log('OTP verified, user logged in:', credential.user);
        Alert.alert('Success', 'OTP Verified Successfully!');
        
        // Navigate to AppointmentList after successful verification
        navigation.replace('AppointmentList');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      console.error('OTP Verification Error:', err);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP sent to {phone}</Text>
      
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter OTP"
        maxLength={6}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <Button title="Verify OTP" onPress={handleVerifyOtp} disabled={loading} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default OtpVerificationScreen;
