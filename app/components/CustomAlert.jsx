import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import tw from 'twrnc';

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="appear"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-70`}>
        <View style={tw`bg-white p-6 rounded-lg shadow-lg w-80`}>
          <Text style={tw`text-lg text-gray-800 mb-4`}>{message}</Text>
          <TouchableOpacity
            style={tw`w-full p-3 bg-teal-500 rounded-lg items-center`}
            onPress={onClose}
          >
            <Text style={tw`text-white text-lg font-bold`}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;