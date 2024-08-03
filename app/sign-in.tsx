import { Text, View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image, Keyboard } from 'react-native';
import React, { useState, useRef } from 'react';
import { useSession } from '../ctx';
import axios from 'axios'; // Import Axios for making HTTP requests

export default function SignIn() {
  const { signIn } = useSession();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Refs for TextInput fields
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const cityRef = useRef(null);
  const passwordRef = useRef(null);

 
  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://ft-final-hslfllsqe-gauravs-projects-9d6ba5c9.vercel.app/users/signup', { // Replace with your backend IP
        name,
        phoneNumber,
        email,
        city,
        password,
      });
      console.log('Sign-in successful:', response.data.message);
      // Handle navigation or other actions after successful sign-in
    } catch (error) {
      console.error('Sign-in failed:', error);
      let errorMessage = 'Sign-in failed. Please try again.';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message; // Custom error message from backend
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      
    }
  };

  const validateForm = () => {
    let valid = true;

    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!phoneNumber || phoneNumber.length !== 10) {
      setPhoneError('Please enter a 10-digit phone number.');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!password || password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const validateEmail = (email: string) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const focusInput = (nextRef: React.RefObject<TextInput>) => {
    if (nextRef.current) {
      nextRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require('../assets/images/ft_logo.png')} style={styles.clipart} />
        <Text style={styles.title}>Sign In</Text>
      </View>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        returnKeyType="next"
        onSubmitEditing={() => focusInput(phoneNumberRef)}
      />
      <TextInput
        ref={phoneNumberRef}
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => {
          setPhoneNumber(text);
          if (text.length !== 10) {
            setPhoneError('Please enter a 10-digit phone number.');
          } else {
            setPhoneError('');
          }
        }}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        returnKeyType="next"
        onSubmitEditing={() => focusInput(emailRef)}
      />
      {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
      <TextInput
        ref={emailRef}
        style={styles.input}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (!validateEmail(text)) {
            setEmailError('Please enter a valid email address.');
          } else {
            setEmailError('');
          }
        }}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => focusInput(cityRef)}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        ref={cityRef}
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="City"
        returnKeyType="next"
        onSubmitEditing={() => focusInput(passwordRef)}
      />
      <TextInput
        ref={passwordRef}
        style={styles.input}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (text.length < 8) {
            setPasswordError('Password must be at least 8 characters.');
          } else {
            setPasswordError('');
          }
        }}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSignIn}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <Button title="Sign In" onPress={handleSignIn} disabled={isLoading} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#cbd5d0', // Greyish green background color
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  clipart: {
    width: 150,
    height: 150,
    resizeMode: 'contain', // Maintain aspect ratio and fit within the specified dimensions
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff', // Optional: Input field background color
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});
