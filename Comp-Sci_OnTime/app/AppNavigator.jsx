import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './login_Page';
import SignUpPage from './SignUpPage';
import ForgotPassword from './ForgotPassword';
import HomeScreen from './HomeScreen';
import HomeworkPage from './HomeworkPage';
import CalenderPage from './CalenderPage';
import TimetablePage from './TimetablePage';
import SettingsPage from './AccountSettingsPage'; // Ensure you have a Settings component

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUpPage} options={{headerShown: false}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Hide the header for the Home screen
        />
        <Stack.Screen name="Homework" component={HomeworkPage} />
        <Stack.Screen name="Calender" component={CalenderPage} />
        <Stack.Screen name="Timetable" component={TimetablePage} />
        <Stack.Screen name="Settings" component={SettingsPage} />
      </Stack.Navigator>
  );
};

export default AppNavigator;