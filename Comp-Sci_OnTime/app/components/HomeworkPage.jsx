import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../assets/ThemeContext';
import { ArrowLeft, BookOpen, BadgePlus, PlusCircle, XCircle } from 'lucide-react-native';

const HomeworkPage = ({ navigation }) => {
  const { darkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [homeworks, setHomeworks] = useState([
    { id: 1, subject: "Math", description: "Calculus Ch. 5", dueDate: "2024-11-25", priority: "high", completed: false },
    { id: 2, subject: "Physics", description: "Lab Report", dueDate: "2024-11-26", priority: "medium", completed: false },
    { id: 3, subject: "English", description: "Essay Draft", dueDate: "2024-11-28", priority: "low", completed: false },
    { id: 4, subject: "English", description: "Essay Draft", dueDate: "2024-11-28", priority: "low", completed: false },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newHomework, setNewHomework] = useState({ subject: '', description: '', dueDate: '' });



  const priorityConfig = {
    high: { 
      color: 'red',
      label: 'High'
    },
    medium: { 
      color: 'yellow',
      label: 'Medium'
    },
    low: { 
      color: 'gray',
      label: 'Low'
    }
  };

  const activeHomeworks = homeworks.filter(hw => !hw.completed);
  const filteredHomeworks = activeHomeworks.filter(hw => 
    activeFilter === 'all' ? true : hw.priority === activeFilter
  );

  const priorityCounts = {
    high: activeHomeworks.filter(hw => hw.priority === 'high').length,
    medium: activeHomeworks.filter(hw => hw.priority === 'medium').length,
    low: activeHomeworks.filter(hw => hw.priority === 'low').length
  };

  const handleAddHomework = () => {
    setHomeworks([...homeworks, { ...newHomework, id: homeworks.length + 1, priority: 'low', completed: false }]);
    setShowModal(false);
    setNewHomework({ subject: '', description: '', dueDate: '' });
  };


  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-950' : 'bg-stone-50'}`}>
      {/* Header */}
      <View style={tw`px-5 py-7`}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={30} color={`${darkMode ? 'white' : 'black'}`} />
          </TouchableOpacity>
          <View style={tw`flex-row items-center`}>
            <View style={tw`flex-col items-center ml-24`}>
              <BookOpen size={28} color="teal" />
              <Text style={tw`text-xl mt-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Homework</Text>
            </View>
            <TouchableOpacity
              style={tw`ml-18 p-2 rounded-full`}
              onPress={() => setShowModal(true)} // shows the popup to add homework
            >
              <PlusCircle size={35} color={`${darkMode ? 'white' : 'black'}`} />
            </TouchableOpacity>
          </View>
          <View style={tw`w-8`} /> {/* Placeholder to balance the layout */}
        </View>
      </View>

      {/* Status Bar */}
      <View style={tw` p-4`}>
        <Text style={tw`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
          {activeHomeworks.length} Active Assignments
        </Text>
        <View style={tw`flex-row gap-2`}>
          <TouchableOpacity
            onPress={() => setActiveFilter('all')}
            style={tw`px-5 py-1 rounded-full text-sm font-medium transition-colors flex-row items-center ${
              activeFilter === 'all' ? 'bg-teal-700 text-white' : 'bg-gray-800 text-gray-200'
            }`}
          >
            <Text style={tw`${activeFilter === 'all' ? 'text-white' : 'text-gray-400'} font-medium`}>All</Text>
          </TouchableOpacity>
          {Object.entries(priorityConfig).map(([priority, config]) => (
            <TouchableOpacity
              key={priority}
              onPress={() => setActiveFilter(priority)}
              style={tw`px-3 py-3 rounded-full text-sm font-medium transition-colors flex-row items-center gap-2 ${
                activeFilter === priority
                  ? `bg-${config.color}-500 text-white `
                  : `bg-${config.color}-${darkMode ? '800/50' : '200/35'} text-${config.color}-900`
              }`}
            >
              <Text style={tw`${activeFilter === priority ? 'text-white' : 'text-gray-600'} font-medium`}>{config.label}</Text>
              <View style={tw` px-1.5 py-0.5 rounded-full`}>
                <Text style={tw`font-semibold ${activeFilter === priority ? 'text-white' : 'text-gray-600'}`}>{priorityCounts[priority]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Main Content */}
      <Text style={tw`ml-4 text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Upcoming Assignments</Text>
      <ScrollView style={tw`flex-1 p-4 mb-3`}>
        <View style={tw`mb-4`}>
          {/* Add your assignment components here */}
          {filteredHomeworks.map((homework) => (
            <View
              key={homework.id}
              style={tw`mt-2 p-4 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg border-l-4 border-${priorityConfig[homework.priority].color}-500`}
            >
              <Text style={tw`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{homework.subject}</Text>
              <Text style={tw`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{homework.description}</Text>
              <Text style={tw`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Due: {homework.dueDate}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add Homework Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`${darkMode ? 'bg-gray-950' : 'bg-white'} p-6 rounded-lg w-11/12 max-w-md`}>
            <View style={tw`flex-row justify-between items-center mb-6`}>
              <Text style={tw`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>New Assignment</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <XCircle size={29} color={darkMode ? 'white' : 'gray'} />
              </TouchableOpacity>
            </View>
            <View style={tw`space-y-4`}>
              <View>
                <Text style={tw`block text-smfont-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Title</Text>
                <TextInput
                  style={tw`w-full rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white text-gray-900'} p-3 text-sm focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Enter title"
                  placeholderTextColor={darkMode ? 'gray' : 'gray'}
                  value={newHomework.title}
                  onChangeText={(text) => setNewHomework({ ...newHomework, title: text })}
                />
              </View>
              <View>
                <Text style={tw`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Description</Text>
                <TextInput
                  style={tw`w-full rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white text-gray-900'} p-3 text-sm focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Enter description"
                  placeholderTextColor={darkMode ? 'gray' : 'gray'}
                  value={newHomework.description}
                  onChangeText={(text) => setNewHomework({ ...newHomework, description: text })}
                  multiline
                  numberOfLines={3}
                />
              </View>
              <View>
                <Text style={tw`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Due Date</Text>
                <TextInput
                  style={tw`w-full rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white text-gray-900'} p-3 text-sm focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Enter due date"
                  placeholderTextColor={darkMode ? 'gray' : 'gray'}
                  value={newHomework.dueDate}
                  onChangeText={(text) => setNewHomework({ ...newHomework, dueDate: text })}
                />
              </View>
              <TouchableOpacity
                style={tw`w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors mt-4`}
                onPress={handleAddHomework}
              >
                <Text style={tw`text-center text-white`}>Add Homework</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


    </View>
  );
};

export default HomeworkPage;