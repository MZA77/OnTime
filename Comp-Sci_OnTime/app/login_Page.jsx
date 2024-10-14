import React, { useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const LoginPage = () => {
  useEffect(() => {
    // Perform side effects here
    console.log('Component mounted or updated');
  }, []); // Empty dependency array means this runs once on mount

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <View style={tw`bg-white p-5 rounded-lg shadow-lg w-80`}>
        <Text style={tw`text-center text-2xl text-gray-800 mb-5`}>Login</Text>
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-600 mb-2`}>Email</Text>
          <TextInput style={tw`w-full p-2 border border-gray-300 rounded`} keyboardType="email-address" autoCapitalize="none" />
        </View>
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-600 mb-2`}>Password</Text>
          <TextInput style={tw`w-full p-2 border border-gray-300 rounded`} secureTextEntry />
        </View>
        <TouchableOpacity style={tw`w-full p-3 bg-blue-500 rounded items-center mt-2`}>
          <Text style={tw`text-white text-lg font-bold`}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`w-full p-3 bg-white border border-blue-500 rounded items-center mt-2 shadow-sm`}>
          <Text style={tw`text-blue-500 text-lg font-bold`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;