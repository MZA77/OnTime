import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Animated, Easing, useColorScheme, Image  } from 'react-native';
import tw from 'twrnc';
import { auth } from '../../firebase'; // Adjust the path as necessary
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Clock3 } from 'lucide-react-native';
import * as AuthSession from 'expo-auth-session';




const customIcon = require('../../assets/images/trans_fav.png');


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    // Generate the redirect URI
    const redirectUri = AuthSession.makeRedirectUri({
      useProxy: true, // Ensures compatibility with Expo
    });

    console.log("Generated Redirect URI:", redirectUri);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login Failed', 'Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve the username from Firestore
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const username = userDoc.data().username;


      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };


  return (
    <View style={tw`flex-1 justify-start items-center bg-teal-500`}>
      <Image source={customIcon} style={tw`w-25 h-25 mt-20`}/>
      <Text style={tw`text-4xl mt-3 mb-2 font-bold text-slate-50`}>OnTime</Text>
      <Text style={tw`text-lg mb-7 text-slate-50`}>Stay on Track With your Assignments</Text>
      <View style={tw`bg-white p-6 mt-1 rounded-xl shadow-md w-80`}>
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
        {/* Login Button */}
        <TouchableOpacity style={tw`w-full p-4 bg-teal-500 rounded-lg items-center mb-2 mt-1`} onPress={handleLogin}>
          <Text style={tw`text-white text-lg font-bold`}>Login</Text>
        </TouchableOpacity>
        {/* Forgot Password Link */}
        <TouchableOpacity style={tw`ml-9`} onPress={() => navigation.navigate('ForgotPassword')}> 
          <Text style={tw`flex-row p-1 text-teal-500 text-sm mt-2 font-bold`}>Forgot Password?</Text>
        </TouchableOpacity>
        {/* signnup */}
        <TouchableOpacity style={tw`self-center`}> 
            <Text style={tw`p-1 text-gray-950 text-sm mt-0 text-center`}>Don't have an account? <Text style={tw`text-teal-500 font-bold`} onPress={() => navigation.navigate('SignUp')}>SignUp</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;