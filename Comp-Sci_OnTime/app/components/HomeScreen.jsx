import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import tw from 'twrnc';
import { useFocusEffect } from '@react-navigation/native';
import { Clock, Bell, Sun, Moon, User, BookOpen, CheckCircle2, Calendar, Clock3, Settings } from 'lucide-react-native';
import { auth, db } from '../../firebase'; // Adjust the path as necessary
import { doc, getDocs, getDoc, query, where, collection } from 'firebase/firestore';
import { useTheme } from '../../assets/ThemeContext'; // Adjust the path as necessary

const lightModeClockIcon = require('../../assets/images/DMicon2.png');
const darkModeClockIcon = require('../../assets/images/LMicon2.png');

const HomeScreen = ({ navigation }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [username, setUsername] = useState('');
  const [highPriorityHomeworkCount, setHighPriorityHomeworkCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
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

      const fetchHighPriorityHomeworks = async () => {
        const user = auth.currentUser;
        if (user) {
          const q = query(collection(db, 'homeworks'), where('userId', '==', user.uid), where('priority', '==', 'high'));
          const querySnapshot = await getDocs(q);
          console.log('Fetched high priority homeworks:', querySnapshot.docs.map(doc => doc.data())); // Debugging line
          setHighPriorityHomeworkCount(querySnapshot.size);
        }
      };

      fetchUsername();
      fetchHighPriorityHomeworks();
    }, [])
  );

  return (
    <SafeAreaView style={tw`flex-1 ${darkMode ? 'bg-gray-950' : 'bg-stone-50'}`}>
      {/* Header */}
      <View style={tw`px-4 py-1`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-base ml-2 mt-9 font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Hi {username}👋</Text>
          </View>
          <View style={tw`flex-row gap-5 mt-9 mr-4 items-center`}>
            <User size={24} color={darkMode ? 'white' : 'black'} />
            <TouchableOpacity onPress={toggleDarkMode}>
              {darkMode ? <Sun size={24} color="white" /> : <Moon size={24} color="black" />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`absolute inset-x-20 top-0 flex-col items-center mt-6`}>
          <Image source={darkMode ? lightModeClockIcon : darkModeClockIcon} style={{ width: 28, height: 28 }} />
          <Text style={tw`text-2xl  font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>OnTime</Text>
        </View>
      </View>
      

      {/* Main Content - Scrollable */}
      <ScrollView style={tw`flex-1 p-4 mt-10 overflow-y-scroll`}>
        {/* Quick Stats */}
        <View style={tw`flex-row justify-between mb-4`}>
          <View style={tw`flex-1 p-3 mr-2 flex-row items-center gap-3 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg`}>
            <View style={tw`${darkMode ? 'bg-gray-800' : 'bg-teal-50'} p-2 rounded-lg`}>
              <BookOpen size={20} color="teal" />
            </View>
            <View>
              <Text style={tw`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Due Soon</Text>
              <Text style={tw`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{highPriorityHomeworkCount} Tasks</Text>
            </View>
          </View>
          <View style={tw`flex-1 p-3 ml-2 flex-row items-center gap-3 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'} rounded-lg`}>
            <View style={tw`${darkMode ? 'bg-gray-800' : 'bg-emerald-50'} p-2 rounded-lg`}>
              <CheckCircle2 size={20} color="teal" />
            </View>
            <View>
              <Text style={tw`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Completed</Text>
              <Text style={tw`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}># Tasks</Text>
            </View>
          </View>
        </View>

        {/* Navigation Carddfds */}
        <View style={tw`flex-row flex-wrap justify-between mt-3`}>
          {/* Homework Card */}
          <TouchableOpacity
            style={tw`w-full md:w-[48%] p-4 mb-4 cursor-pointer border ${darkMode ? 'bg-gray-900 hover:bg-gray-750 active:bg-gray-700' : 'bg-white hover:bg-gray-50 active:bg-gray-100 border-gray-50'} rounded-lg`}
            onPress={() => navigation.navigate('Homework')}
          >
            <View style={tw`flex-col items-center text-center`}>
              <View style={tw`${darkMode ? 'bg-gray-800' : 'bg-teal-50'} p-3 rounded-xl mb-2`}>
                <BookOpen size={24} color="teal" />
              </View>
              <Text style={tw`font-semibold text-base mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Homework</Text>
              <Text style={tw`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage assignments</Text>
            </View>
          </TouchableOpacity>

          {/* Timetable Card */}
          <TouchableOpacity
            style={tw`w-full md:w-[48%] p-4 mb-4 cursor-pointer border ${darkMode ? 'bg-gray-900 hover:bg-gray-750 active:bg-gray-700' : 'bg-white hover:bg-gray-50 active:bg-gray-100 border-gray-50'} rounded-lg`}
            onPress={() => navigation.navigate('Timetable')}
          >
            <View style={tw`flex-col items-center text-center`}>
              <View style={tw`${darkMode ? 'bg-gray-800' : 'bg-teal-50'} p-3 rounded-xl mb-2`}>
                <Clock3 size={24} color="teal" />
              </View>
              <Text style={tw`font-semibold text-base mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Timetable</Text>
              <Text style={tw`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Class schedule</Text>
            </View>
          </TouchableOpacity>

          {/* Calendar Card */}
          <TouchableOpacity
            style={tw`w-full md:w-[48%] p-4 mb-4 cursor-pointer border ${darkMode ? 'bg-gray-900 hover:bg-gray-750 active:bg-gray-700' : 'bg-white hover:bg-gray-50 active:bg-gray-100 border-gray-50'} rounded-lg`}
            onPress={() => navigation.navigate('Calender')}
          >
            <View style={tw`flex-col items-center text-center`}>
              <View style={tw`${darkMode ? 'bg-gray-800' : 'bg-teal-50'} p-3 rounded-xl mb-2`}>
                <Calendar size={24} color="teal" />
              </View>
              <Text style={tw`font-semibold text-base mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Calendar</Text>
              <Text style={tw`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>View deadlines</Text>
            </View>
          </TouchableOpacity>

          {/* Settings Card */}
          <TouchableOpacity
            style={tw`w-full md:w-[48%] p-4 mb-4 cursor-pointer border ${darkMode ? 'bg-gray-900 hover:bg-gray-750 active:bg-gray-700' : 'bg-white hover:bg-gray-50 active:bg-gray-100 border-gray-50'} rounded-lg`}
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={tw`flex-col items-center text-center`}>
              <View style={tw`${darkMode ? 'bg-gray-800' : 'bg-teal-50'} p-3 rounded-xl mb-2`}>
                <Settings size={24} color="teal" />
              </View>
              <Text style={tw`font-semibold text-base mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Settings</Text>
              <Text style={tw`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customize app</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

