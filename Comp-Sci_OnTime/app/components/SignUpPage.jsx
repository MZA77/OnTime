import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Patform, ScrollView } from 'react-native';
import tw from 'twrnc';
import { auth } from '../../firebase'; // Adjust the path as necessary
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
    <View style={tw`flex-1 justify-start items-center bg-teal-500`}>
      <Text style={tw`text-4xl mt-29 mb-5 font-bold text-slate-50`}>OnTime</Text>
      <View style={tw`bg-white p-6 mt-1 rounded-xl shadow-md w-80`}>
        {/* Username */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 mb-2`}>Username</Text>
          <TextInput
            style={tw`w-full p-3 border border-slate-200 rounded-lg bg-slate-50`}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        {/* Email */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 mb-2`}>Email</Text>
          <TextInput
            style={tw`w-full p-3 border border-slate-200 rounded-lg bg-slate-50`}
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
            style={tw`w-full p-3 border border-slate-200 rounded-lg bg-slate-50`}
            keyboardType="email-address"
            autoCapitalize="none"
            value={verifyEmail}
            onChangeText={setVerifyEmail}
          />
        </View>
        {/* Password */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 mb-2`}>Password</Text>
          <View style={tw`flex-row items-center`}>
            <TextInput
              style={tw`flex-1 p-3 border border-slate-200 rounded-lg bg-slate-50`}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Text style={tw`text-teal-500 ml-2 mt-2`}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Sign Up Button */}
        <TouchableOpacity style={tw`w-full p-4 bg-teal-500 rounded-lg items-center mb-2 mt-1`} onPress={handleSignUp}>
          <Text style={tw`text-white text-lg font-bold`}>Sign Up</Text>
        </TouchableOpacity>
        {/* Back to Login Link */}
        <TouchableOpacity style={tw`self-center`}>
          <Text style={tw`p-1 text-black-500 text-sm mt-0 text-center`}>
            Already have an account? <Text style={tw`text-teal-500 font-bold`} onPress={() => navigation.navigate('Login')}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpPage;