import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { auth } from '../../firebase'; // Adjust the path as necessary
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent.');
      // Optionally navigate back to the login screen
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <Text style={tw`text-2xl text-gray-800 mb-5`}>Forgot Password</Text>
      <View style={tw`w-80`}>
        <Text style={tw`text-gray-600 mb-2`}>Email</Text>
        <TextInput
          style={tw`w-full p-2 border border-gray-300 rounded mb-5`}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          style={tw`w-full p-3 bg-blue-500 rounded items-center`}
          onPress={handlePasswordReset}
        >
          <Text style={tw`text-white text-lg font-bold`}>Send Password Reset Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;