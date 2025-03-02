import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { verifyOtp } from '../services/authService';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
type OtpNavigationProp = StackNavigationProp<RootStackParamList, 'OtpVerification'>;
const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const navigation = useNavigation<OtpNavigationProp>();
  const { phone } = route.params as { phone: string };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError('');

    try {
      const success = await verifyOtp(phone, otp);

      if (success) {
        console.log('OTP verified, user approved');
        navigation.navigate('AppointmentList'); // Redirect to home
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      setError('Error verifying OTP');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text>Enter OTP sent to {phone}</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={otp} onChangeText={setOtp} placeholder="Enter OTP" />

      {error && <Text style={styles.error}>{error}</Text>}

      <Button title={loading ? 'Verifying...' : 'Verify OTP'} onPress={handleVerifyOtp} disabled={loading} />
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
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default OtpVerificationScreen;
