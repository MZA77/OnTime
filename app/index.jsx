import { registerRootComponent } from 'expo';
import React from 'react';
import AppNavigator from './AppNavigator';
import { ThemeProvider } from '../assets/ThemeContext'; // Adjust the path as necessary

const App = () => {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};

registerRootComponent(App);

export default App;