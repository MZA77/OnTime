import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ForgotPassword from './components/ForgotPassword';
import HomeScreen from './components/HomeScreen';
import HomeworkPage from './components/HomeworkPage';
import CalenderPage from './components/CalenderPage';
import TimetablePage from './components/TimetablePage';
import Settings from './components/AccountSettingsPage'; // Ensure you have a Settings component

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUpPage} options={{headerShown: false}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Homework" component={HomeworkPage} options={{ headerShown: false }} />
        <Stack.Screen name="Calender" component={CalenderPage} />
        <Stack.Screen name="Timetable" component={TimetablePage} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;