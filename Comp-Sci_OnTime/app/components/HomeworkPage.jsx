import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../assets/ThemeContext';
import { ArrowLeft, BookOpen, Calendar, PlusCircle, XCircle } from 'lucide-react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const HomeworkPage = ({ navigation }) => {
  const { darkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [homeworks, setHomeworks] = useState([
    { id: 1, subject: "Math", description: "Calculus Ch. 5", dueDate: "2024-11-25", priority: "high", completed: false, estimatedTime: 60 },
    { id: 2, subject: "Physics", description: "Lab Report", dueDate: "2024-11-26", priority: "medium", completed: false, estimatedTime: 120 },
    { id: 3, subject: "English", description: "Essay Draft", dueDate: "2024-11-28", priority: "low", completed: false, estimatedTime: 90 },
    { id: 4, subject: "English", description: "Essay Draft", dueDate: "2024-11-28", priority: "low", completed: false, estimatedTime: 90 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newHomework, setNewHomework] = useState({ subject: '', description: '', dueDate: '', estimatedTime: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);

  {/* This is the priority configuration for the assignments */}
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


  const calculatedaysRemaining = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDiff = dueDateObj - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysRemaining;
  };

  {/* This is the function to calculate the priority based on the due date */}
  const calculatePriority = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDiff = dueDateObj - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 2) {
      return 'high';
    } else if (daysRemaining <= 5) {
      return 'medium';
    } else {
      return 'low';
    }
  };

  {/* This is the function to filter the assignments */}
  const activeHomeworks = homeworks.filter(hw => !hw.completed);
  const filteredHomeworks = activeHomeworks.filter(hw => 
    activeFilter === 'all' ? true : hw.priority === activeFilter
  );

  {/* This is the function to count the number of assignments */}
  const priorityCounts = {
    high: activeHomeworks.filter(hw => hw.priority === 'high').length,
    medium: activeHomeworks.filter(hw => hw.priority === 'medium').length,
    low: activeHomeworks.filter(hw => hw.priority === 'low').length
  };

  {/* This is the function to add a new homework */}
  const handleAddHomework = () => {
    const priority = calculatePriority(newHomework.dueDate);
    setHomeworks([...homeworks, { ...newHomework, id: homeworks.length + 1, priority, completed: false }]);
    setShowModal(false);
    setNewHomework({ subject: '', description: '', dueDate: '', estimatedTime: '' });
  };

  {/* This is the function to handle the date change */}
  const handleDateChange = (selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setNewHomework({ ...newHomework, dueDate: currentDate.toISOString().split('T')[0] });
  };

  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-950' : 'bg-stone-50'}`}>
      {/* Header */}
      <View style={tw`px-5 py-7 mb-7`}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={30} color={`${darkMode ? 'white' : 'black'}`} />
          </TouchableOpacity>
          <View style={tw`flex-row items-center`}>
            <View style={tw`absolute inset-x-0 top-0 flex-col items-center`}>
              <BookOpen size={28} color="teal" />
              <Text style={tw`text-xl mt-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Homework</Text>
            </View>
          </View>
          <View style={tw`w-8`} /> {/* Placeholder to balance the layout */}
        </View>
        <TouchableOpacity
          style={tw`absolute top-7 right-5 p-2 rounded-full`}
          onPress={() => setShowModal(true)} // Show the modal
        >
          <PlusCircle size={35} color={`${darkMode ? 'white' : 'black'}`} />
        </TouchableOpacity>
      </View>

      {/* Status Bar */}
      <View style={tw`p-4`}>
        {/* This is the number of active assignments */}
        <Text style={tw`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
          {activeHomeworks.length} Active Assignments
        </Text>
        {/* This is the filter for the assignments */}
        <View style={tw`flex-row gap-2`}>
          <TouchableOpacity
            onPress={() => setActiveFilter('all')}
            style={tw`px-5 py-1 rounded-full text-sm font-medium transition-colors flex-row items-center ${
              activeFilter === 'all' ? 'bg-teal-700 text-white' : 'bg-gray-800 text-gray-200'
            }`}
          >
            <Text style={tw`${activeFilter === 'all' ? 'text-white' : 'text-gray-400'} font-medium`}>All</Text>
          </TouchableOpacity>
          {/* This is the priority filter for the assignments */}
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
          {/* Athis is the formatting for the assignments and how they will look */}
          {filteredHomeworks.map((homework) => (
            <View
              key={homework.id}
              style={tw`mt-3 p-4 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg border-l-4 border-${priorityConfig[homework.priority].color}-500`}
            >
              <View>
                <Text style={tw`text-base font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{homework.subject}</Text>
                <Text style={tw`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-900'}`}>{homework.description}</Text>
                <Text style={tw`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-900'}`}>Due in <Text style={tw`font-semibold`}>{calculatedaysRemaining(homework.dueDate)} days</Text></Text>
              </View>
              <Text style={tw`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-900'}`}>ET: {homework.estimatedTime} mins</Text>
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
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-75`}>
          <View style={tw`${darkMode ? 'bg-gray-950' : 'bg-white'} p-6 rounded-lg w-11/12 max-w-md`}>
            <View style={tw`flex-row justify-between items-center mb-6`}>
              <Text style={tw`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>New Assignment</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <XCircle size={29} color={darkMode ? 'white' : 'gray'} />
              </TouchableOpacity>
            </View>
            <View style={tw`space-y-4`}>
              {/* This is the subject of the assignment */}
              <View>
                <Text style={tw`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Subject</Text>
                <TextInput
                  style={tw`w-full rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white text-gray-900'} p-3 text-sm focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Subject e.g. Math, Physics..."
                  placeholderTextColor={darkMode ? 'gray' : 'gray'}
                  value={newHomework.subject}
                  onChangeText={(text) => setNewHomework({ ...newHomework, subject: text })}
                />
              </View>
              {/* This is the description of the assignment */}
              <View>
                <Text style={tw`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Description</Text>
                <TextInput
                  style={tw`w-full rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white text-gray-900'} p-3 text-sm focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Description e.g. P.87 Questions 1-5..."
                  placeholderTextColor={darkMode ? 'gray' : 'gray'}
                  value={newHomework.description}
                  onChangeText={(text) => setNewHomework({ ...newHomework, description: text })}
                  multiline
                  numberOfLines={3}
                />
              </View>
              {/* This is the due date for the assignment */}
              <View>
                <Text style={tw`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Due Date</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>  
                  <View style={tw`flex-row items-center border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} rounded-xl p-3`}>
                    <TextInput
                      style={tw`flex-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}
                      placeholder="Enter due date"
                      placeholderTextColor={darkMode ? 'gray' : 'gray'}
                      value={newHomework.dueDate}
                      editable={false}
                    />
                    <Calendar size={24} color={darkMode ? 'white' : 'gray'} />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={tw`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Estimated Time (minutes)</Text>
                <TextInput
                  style={tw`w-full rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white text-gray-900'} p-3 text-sm focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Enter estimated time in minutes"
                  placeholderTextColor={darkMode ? 'gray' : 'gray'}
                  value={newHomework.estimatedTime}
                  onChangeText={(text) => setNewHomework({ ...newHomework, estimatedTime: text })}
                  keyboardType="numeric"
                />
              </View>
              <TouchableOpacity
                style={tw`w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors mt-4`}
                onPress={handleAddHomework}
              >
                <Text style={tw`text-center font-semibold text-white`}>Add Homework</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={() => setShowDatePicker(false)}
        headerTextIOS="Pick a date"
        confirmTextIOS="Confirm"
        cancelTextIOS="Cancel"
        customHeaderIOS={() => (
          <View style={tw`bg-indigo-300 p-4 rounded-t-lg`}>
            <Text style={tw`text-white text-lg font-bold`}>Pick a date</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeworkPage;