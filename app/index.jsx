import { registerRootComponent } from 'expo';
import React from 'react';
import AppNavigator from './AppNavigator';

const App = () => {
  return <AppNavigator />;
};

registerRootComponent(App);

export default App;