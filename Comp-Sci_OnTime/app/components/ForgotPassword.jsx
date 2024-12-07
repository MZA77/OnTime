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
    <View style={tw`flex-1 justify-start items-center bg-teal-500`}>
      <Text style={tw`text-4xl mt-29 mb-15 font-bold text-slate-50`}>OnTime</Text>
      <View style={tw`bg-white p-6 mt-20 rounded-xl shadow-md w-80`}>
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 mb-2`}>Email</Text>
          <TextInput
            style={tw`w-full p-3 border border-slate-200 rounded-lg bg-slate-50`}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <TouchableOpacity
          style={tw`w-full p-4 bg-teal-500 rounded-lg items-center mb-2 mt-1`}
          onPress={handlePasswordReset}
        >
          <Text style={tw`text-white text-lg font-bold`}>Send Password Reset Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`self-center`}>
          <Text style={tw`p-1 text-gray-950 text-sm mt-0 text-center`}>
            Remember your password? <Text style={tw`text-teal-500 font-bold`} onPress={() => navigation.navigate('Login')}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;