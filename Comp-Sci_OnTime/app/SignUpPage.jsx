import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { auth } from '../firebase'; // Adjust the path as necessary
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sign Up Successful', 'Your account has been created.');
      // Navigate to the login screen or home screen
      navigation.navigate('Login'); // Replace 'Login' with your target screen
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <View style={tw`bg-white p-5 rounded-lg shadow-lg w-80`}>
        <Text style={tw`text-center text-2xl text-gray-800 mb-5`}>Sign Up</Text>
        {/* Email */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 mb-2`}>Email</Text>
          <TextInput
            style={tw`w-full p-2 border border-gray-300 rounded`}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {/* Password */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 mb-2`}>Password</Text>
          <TextInput
            style={tw`w-full p-2 border border-gray-300 rounded`}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {/* Sign Up Button */}
        <TouchableOpacity style={tw`w-full p-3 bg-blue-500 rounded items-center mt-2 mb-3`} onPress={handleSignUp}>
          <Text style={tw`text-white text-lg font-bold`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {/* Back to Login Button */}
      <TouchableOpacity
        style={tw`w-7/9 p-3 bg-white border border-blue-500 rounded items-center mt-2 shadow-sm`}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={tw`text-blue-500 text-lg font-bold`}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpPage;