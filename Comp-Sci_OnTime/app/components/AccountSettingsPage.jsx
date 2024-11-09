import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { auth } from '../../firebase'; // Adjust the path as necessary
import { signOut } from 'firebase/auth';

const Settings = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert('Sign Out Successful', 'You have been signed out.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Sign Out Failed', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <Text style={tw`text-2xl text-gray-800 mb-5`}>Settings</Text>
      {/* Sign Out Button */}
      <TouchableOpacity
        style={tw`w-80 p-3 bg-red-500 rounded items-center mt-2 shadow-sm`}
        onPress={handleSignOut}
      >
        <Text style={tw`text-white text-lg font-bold`}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;