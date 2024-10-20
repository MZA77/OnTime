import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Patform, ScrollView } from 'react-native';
import tw from 'twrnc';
import { auth } from '../firebase'; // Adjust the path as necessary
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';



const SignUpPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [verifyEmail, setVerifyEmail] = useState(''); // State for verify email
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    if (email !== verifyEmail) {
      Alert.alert('Sign Up Failed', 'Email addresses do not match.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert('Sign Up Failed', 'Password must be longer than 6 characters, include at least one number, one capital letter, and one special character.');
      return;
    }  // password strenght checker 

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the username in Firestore
      const db = getFirestore();
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
      });

      Alert.alert('Sign Up Successful', 'Your account has been created.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <View style={tw`bg-white p-5 rounded-lg shadow-lg w-80`}>
        <Text style={tw`text-center text-2xl text-gray-800 mb-5`}>Sign Up</Text>
        {/* Username */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 mb-2`}>Username</Text>
          <TextInput
            style={tw`w-full p-2 border border-gray-300 rounded`}
            value={username}
            onChangeText={setUsername}
          />
        </View>
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
        {/* Verify Email */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 mb-2`}>Verify Email</Text>
          <TextInput
            style={tw`w-full p-2 border border-gray-300 rounded`}
            keyboardType="email-address"
            autoCapitalize="none"
            value={verifyEmail}
            onChangeText={setVerifyEmail}
          />
        </View>
        {/* Password */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 mb-2`}>Password</Text>
          <TextInput
            style={tw`w-full p-2 border border-gray-300 rounded`}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>           
            <Text style={tw`text-blue-500  rounded ml-2 text-left mt-2`}>
              {showPassword ? 'Hide' : 'Show'}     {/*this will allow the user to show or hide their password */}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Sign Up Button */}
        <TouchableOpacity style={tw`w-full p-3 bg-blue-500 rounded items-center mt-2 mb-3`} onPress={handleSignUp}>
          <Text style={tw`text-white text-lg font-bold`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {/* Back to Login Button */}
      <TouchableOpacity
        style={tw`w-7/9 p-3 bg-white border border-blue-500 rounded items-center mt-2 shadow-sm`}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={tw`text-blue-500 text-lg font-bold`}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpPage;