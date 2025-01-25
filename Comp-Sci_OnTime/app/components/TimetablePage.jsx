import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Button, Alert } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../assets/ThemeContext';
import { ArrowLeft, PlusCircle, Clock3 } from 'lucide-react-native';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';

const GOOGLE_CLIENT_ID = "854093976816-qn58d8mf0g5ivl82i73tb8g6m4hc2ack.apps.googleusercontent.com"; // Replace with your Client ID
const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });

const TimetablePage = ({ navigation }) => {
  const { darkMode } = useTheme();
  const [accessToken, setAccessToken] = useState(null);
  const [events, setEvents] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const authenticateWithGoogle = async () => {
    console.log("Starting Google authentication...");
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=https://www.googleapis.com/auth/calendar.readonly`;

    try {
      const result = await AuthSession.startAsync({ authUrl });
      console.log("Auth result:", result);

      if (result.type === "success" && isMounted.current) {
        setAccessToken(result.params.access_token);
      } else {
        Alert.alert("Authentication failed", "Please try again.");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      Alert.alert("Authentication error", error.message);
    }
  };

  const fetchTodaysEvents = async (accessToken) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    try {
      const response = await axios.get(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            maxResults: 10,
            singleEvents: true,
            orderBy: "startTime",
            timeMin: startOfDay.toISOString(),
            timeMax: endOfDay.toISOString(),
          },
        }
      );

      if (isMounted.current) {
        setEvents(response.data.items);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      Alert.alert("Error fetching events", error.message);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchTodaysEvents(accessToken);
    }
  }, [accessToken]);

  return (
    <SafeAreaView style={tw`flex-1 ${darkMode ? 'bg-gray-950' : 'bg-stone-50'}`}>
      {/* Header */}
      <View style={tw`px-5 py-7 mb-7`}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mt-3`}>
            <ArrowLeft size={30} color={`${darkMode ? 'white' : 'black'}`} />
          </TouchableOpacity>
          <View style={tw`flex-row items-center`}>
            <View style={tw`absolute inset-x-0 top-0 flex-col mt--1.5 items-center`}>
              <Clock3 size={30} color={`teal`} />
              <Text style={tw`text-xl mt-2 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Timetable</Text>
            </View>
          </View>
          <View style={tw`w-8`} /> 
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={tw`flex-1 p-4 mb-3`}>
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Today's Events</Text>
          {accessToken ? (
            events.length > 0 ? (
              events.map((event) => (
                <View key={event.id} style={tw`mt-3 p-4 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg`}>
                  <Text style={tw`text-base font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{event.summary}</Text>
                  <Text style={tw`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    {new Date(event.start.dateTime).toLocaleString()} - {new Date(event.end.dateTime).toLocaleString()}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={tw`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>No events for today.</Text>
            )
          ) : (
            <Button title="Login with Google" onPress={authenticateWithGoogle} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TimetablePage;