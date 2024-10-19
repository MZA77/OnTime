/*import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OnTime</Text>
      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',

  },
});*/
import { registerRootComponent } from 'expo';
import React from 'react';
import { View, Text } from 'react-native';
import LoginPage from './login_Page';
import AppNavigator from './AppNavigator';

const App = () => {
  return <AppNavigator />;
};

registerRootComponent(App);

export default App;