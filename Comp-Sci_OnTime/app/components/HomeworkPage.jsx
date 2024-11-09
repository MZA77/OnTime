import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const HomeworkPage = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <Text style={tw`text-2xl text-gray-800`}>Homework Page</Text>
    </View>
  );
};

export default HomeworkPage;