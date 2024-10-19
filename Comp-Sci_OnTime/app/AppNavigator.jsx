import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './login_Page';
import SignUpPage from './SignUpPage';
import ForgotPassword from './ForgotPassword';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
      {/* navigates to SignUp page */}
      <Stack.Screen name="SignUp" component={SignUpPage} />
      {/* navigates to Forgot Password page */} 
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null}} />
    </Stack.Navigator>
  );
};

export default AppNavigator;