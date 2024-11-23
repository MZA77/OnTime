import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../assets/ThemeContext'; // Adjust the path as necessary
import { ArrowLeft, BookOpen, Plus } from 'lucide-react-native';
import { useState } from 'react';

const HomeworkPage = ({ navigation }) => {
  const { darkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const activeHomeworks = '#'; // Example count, replace with actual data
  const priorityCounts = { high: '#', medium: '#', low: '#' }; // Example counts, replace with actual data

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return { button: 'bg-red-400/75', text: 'text-red-500' };
      case 'medium':
        return { button: 'bg-yellow-400/75', text: 'text-yellow-500' };
      case 'low':
        return { button: 'bg-green-400/75', text: 'text-green-500' };
      default:
        return { button: 'bg-gray-200', text: 'text-gray-600' };
    }
  };

  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Header */}
      <View style={tw`px-4 py-6`}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={30} color="teal" />
          </TouchableOpacity>
          <View style={tw`ml-4`}>
            <View style={tw`flex-col items-center`}>
              <BookOpen size={25} color="teal" />
              <Text style={tw`text-2xl mt-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Homework</Text>
            </View>
          </View>
          <View style={tw`mr-2 bg-teal-700/90 p-2 rounded-full`}>
            <TouchableOpacity onPress={() => navigation.navigate('AddHomework')}>
              <Plus size={28} color="white" />
            </TouchableOpacity> 
          </View>
        </View>
      </View>

      {/* Status Bar */}
      <View style={tw`mt-1 p-4 `}>
        <Text style={tw`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3 `}>
          {activeHomeworks} Active Assignments
        </Text>
        <View style={tw`flex-row gap-3`}>
          <TouchableOpacity
            onPress={() => setActiveFilter('all')}
            style={tw`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'all' ? 'bg-teal-700/90' : `${darkMode ? 'bg-gray-950' : 'bg-white'}`  // Set button color based on active filter
            }`}
          >
            <Text style={tw`font-bold mt-0.5 ${activeFilter === 'all' ? 'text-white' : 'text-gray-600'}`}>All</Text>
          </TouchableOpacity>
          {Object.entries({ high: 'High', medium: 'Medium', low: 'Low' }).map(([priority, label]) => (
            <TouchableOpacity
              key={priority}
              onPress={() => setActiveFilter(priority)}
              style={tw`px-3 py-1 rounded-full text-sm font-medium transition-colors flex-row items-center gap-2 ${
                activeFilter === priority
                  ? `${getPriorityColor(priority).button} text-white`
                  : `${darkMode ? 'bg-gray-950' : 'bg-white'}`
              }`}  // Set button color based on priority
            >
              <Text style={tw`font-bold ${activeFilter === priority ? 'text-white' : 'text-gray-500'}`}>{label}</Text>  {/* Display label */}
              <View style={tw`px-1.5 py-0.9 text-xs`}>
                <Text style={tw`${darkMode ? 'text-white' : 'text-black'} font-semibold`}>{priorityCounts[priority]}</Text> {/* Display count */}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={tw`flex-1 p-4`}>
        <View style={tw`mb-4`}>

          {/* Add your assignment components here */}
          <View style={tw`mt-2 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
            <Text style={tw`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Assignment 1</Text>
            <Text style={tw`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Due: Tomorrow</Text>
          </View>
          <View style={tw`mt-2 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
            <Text style={tw`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Assignment 2</Text>
            <Text style={tw`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Due: Next Week</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeworkPage;