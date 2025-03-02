import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Import the type
import { login } from '../services/authService'; // Your auth service
import Header from './Header'; // Import the Header component
import Contact from './ContactScreen'; // Keep this for navigational purposes

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    const user = await login(email, password);
    setLoading(false);

    if (user) {
      console.log('User logged in', user);
      navigation.navigate('AppointmentList'); // No more TypeScript error!
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Header />
      {/* Contact Section */}
      <Contact />

      {/* Login Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} />

        {/* Signup Button */}
        <Text style={styles.signupText}>Don't have an account? Sign up here</Text>
        <Button title="Create Account" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items to the top
    padding: 10,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginTop: 20, // Add some margin to separate from Contact
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  signupText: {
    marginTop: 10,
    fontSize: 14,
  },
});

export default HomeScreen;