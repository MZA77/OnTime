import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const ForgotPassword = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <Text style={tw`text-2xl text-gray-800`}>Forgot password</Text>
    </View>
  );
};

export default ForgotPassword;