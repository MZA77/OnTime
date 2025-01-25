import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../assets/ThemeContext';
import { ArrowLeft, BookOpen, Calendar, PlusCircle, XCircle, Check } from 'lucide-react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { auth, db } from '../../firebase';
import { getDocs, collection, addDoc, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';


const HomeworkPage = ({ navigation }) => {
  const { darkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [homeworks, setHomeworks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newHomework, setNewHomework] = useState({ subject: '', description: '', dueDate: '', estimatedTime: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expandedHomeworkId, setExpandedHomeworkId] = useState(null);

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


  const truncateDescription = (description) => {
    if (description.length > 32) {
      return description.substring(0, 32) + '...';
    }
    return description;
  };

  const calculatedaysRemaining = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDiff = dueDateObj - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysRemaining === 0) {
      return 'Today';
    } else if (daysRemaining === 1) {
      return 'Tomorrow';
    } else {
      return 'in ' + daysRemaining + ' days';
    }
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

{/* This is the function to fetch the users assignments */}
  useEffect(() => {
    const fetchHomeworks = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, 'homeworks'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedHomeworks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHomeworks(fetchedHomeworks);
      }
    };

    fetchHomeworks();
  }, []);

  {/* This is the function to add a new homework */}
  const handleAddHomework = async () => {
    const user = auth.currentUser;
    if (user) {
      const priority = calculatePriority(newHomework.dueDate);
      const newHomeworkWithUser = { ...newHomework, userId: user.uid, priority };
      const docRef = await addDoc(collection(db, 'homeworks'), newHomeworkWithUser);
      setHomeworks([...homeworks, { id: docRef.id, ...newHomeworkWithUser }]);
      setShowModal(false);
      setNewHomework({ subject: '', description: '', dueDate: '', estimatedTime: '' });
    }
  };

  {/* This is the function to delete an assignment */}
  const handleDeleteHomework = async (id) => {
    await deleteDoc(doc(db, 'homeworks', id));
    setHomeworks(homeworks.filter(hw => hw.id !== id));
  };

  {/* This is the function to handle the date change */}
  const handleDateChange = (selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setNewHomework({ ...newHomework, dueDate: currentDate.toISOString().split('T')[0] });
  };

  {/* This is the function to fetch the users assignments and recalculates the priority so the priority will change for different days */}
  useFocusEffect(
    useCallback(() => {
      const fetchHomeworks = async () => {
        const user = auth.currentUser;
        if (user) {
          const q = query(collection(db, 'homeworks'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const fetchedHomeworks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          // Recalculate priorities and update state
          const updatedHomeworks = await Promise.all(fetchedHomeworks.map(async (homework) => {
            const priority = calculatePriority(homework.dueDate);
            if (homework.priority !== priority) {
              await updateDoc(doc(db, 'homeworks', homework.id), { priority });
              return { ...homework, priority };
            }
            return homework;
          }));

          setHomeworks(updatedHomeworks);
        }
      };

      fetchHomeworks();
    }, [])
  );

  const handleCardPress = (id) => {
    setExpandedHomeworkId(expandedHomeworkId === id ? null : id);
  };

  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-950' : 'bg-stone-50'}`}>
      {/* Header */}
      <View style={tw`px-5 py-7 mb-7`}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mt-3`}>
            <ArrowLeft size={30} color={`${darkMode ? 'white' : 'black'}`} />
          </TouchableOpacity>
          <View style={tw`flex-row items-center`}>
            <View style={tw`absolute inset-x-0 top-0 flex-col mt--1.5 items-center`}>
              <BookOpen size={28} color="teal" />
              <Text style={tw`text-xl mt-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Homework</Text>
            </View>
          </View>
          <View style={tw`w-8`} />
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
        <Text style={tw`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>{activeHomeworks.length} Active Assignments</Text>
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
            <TouchableOpacity key={homework.id} onPress={() => handleCardPress(homework.id)}>
              <View
                key={homework.id}
                style={tw`mt-3 p-4 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg border-l-4 border-${priorityConfig[homework.priority].color}-500`}
              >
                <View>
                  <Text style={tw`text-base font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{homework.subject}</Text>
                  <View style={tw`max-w-[90%] mt-1 mb-1`}>
                    <Text style={tw`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    {expandedHomeworkId === homework.id ? homework.description : truncateDescription(homework.description)}</Text>
                  </View>
                  <Text style={tw`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-900'}`}>Due <Text style={tw`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{calculatedaysRemaining(homework.dueDate)}</Text></Text>
                </View>
                <Text style={tw`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-900'}`}>ET: {homework.estimatedTime} mins</Text>
                <View style={tw`absolute inset-y-0 right-4 flex-row items-center`}>
                  <TouchableOpacity onPress={() => handleDeleteHomework(homework.id)} style={tw`ml-4 `}>
                      <Check size={24} color={`${darkMode ? 'white' : 'black'}`} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
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