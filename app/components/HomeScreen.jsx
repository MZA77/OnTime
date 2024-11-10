import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { auth, db } from '../../firebase'; // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const username = userDoc.data().username;
          setUsername(username);
        }
      }
    };

    fetchUsername();
  }, []);



  return (
    <View style={tw`flex-1 justify-start items-center bg-gray-100`}>
      <Text style={tw`text-2xl text-black mb-2 mt-20`}>Hi {username}, Ready To Be</Text>
      <Text style={tw`text-4xl font-bold mb-35`}>OnTime</Text>
      
      {/* Homework Card */}
      <TouchableOpacity style={tw`w-80 p-5 bg-white rounded-lg shadow-lg mb-5 items-center`}
      onPress={() => navigation.navigate('Homework')}>
        <Text style={tw`text-xl text-gray-800`}>Homework</Text>
      </TouchableOpacity>
      
      {/* Calendar Card */}
      <TouchableOpacity style={tw`w-80 p-5 bg-white rounded-lg shadow-lg mb-5 items-center`}
      onPress={() => navigation.navigate('Calender')}>
        <Text style={tw`text-xl text-gray-800`}>Calendar</Text>
      </TouchableOpacity>
      
      {/* Timetable Card */}
      <TouchableOpacity style={tw`w-80 p-5 bg-white rounded-lg shadow-lg mb-5 items-center`}
      onPress={() => navigation.navigate('Timetable')}>
        <Text style={tw`text-xl text-gray-800`}>Timetable</Text>
      </TouchableOpacity>

      {/* settings Card */}
      <TouchableOpacity style={tw`w-80 p-5 bg-white rounded-lg shadow-lg mb-5 items-center`}
      onPress={() => navigation.navigate('Settings')}>
        <Text style={tw`text-xl text-gray-800`}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;