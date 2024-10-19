import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { auth } from '../firebase'; // Adjust the path as necessary
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login Failed', 'Please enter both email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful', 'You have successfully logged in.');
      navigation.navigate('Home'); // navigattes to the Home screen
    } catch (error) {
      Alert.alert('Login Failed', error.message); //if the login fails, an alert will pop up with the error message
    } 
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <View style={tw`bg-white p-5 rounded-lg shadow-lg w-80`}>
        <Text style={tw`text-center text-2xl text-gray-800 mb-5`}>Login</Text>
        {/* Email */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 mb-2`}>Email</Text>
          <TextInput
            style={tw`w-full p-2 border border-gray-300 rounded`}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {/* Password */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 mb-2`}>Password</Text>
          <TextInput
            style={tw`w-full p-2 border border-gray-300 rounded`}
            secureTextEntry={!showPassword} //this is a case which says that the password is definitely hidden
            value={password}
            onChangeText={setPassword} // this will allow the user to enter their password and save the values for handling
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>           
            <Text style={tw`text-blue-500  rounded ml-2 text-left mt-2`}>
              {showPassword ? 'Hide' : 'Show'}     {/*this will allow the user to show or hide their password */}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Login Button */}
        <TouchableOpacity style={tw`w-full p-3 bg-blue-500 rounded items-center mt-2 mb-3`} onPress={handleLogin}>
          <Text style={tw`text-white text-lg font-bold`}>Login</Text>
        </TouchableOpacity>
        {/* Forgot Password Link */}
        <TouchableOpacity style={tw`self-center`} onPress={() => navigation.navigate('ForgotPassword')}> 
          <Text style={tw`p-1 text-blue-500 text-sm mb-1 text-center font-bold`}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      {/* Sign Up Button */}
      <TouchableOpacity
        style={tw`w-7/9 p-3 bg-white border border-blue-500 rounded items-center mt-2 shadow-sm`}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={tw`text-blue-500 text-lg font-bold`}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;