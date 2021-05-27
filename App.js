import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Navigator from './src/Screens/Navigator';

export default function App() {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 200);
  }, []);

  // setTimeout( () => SplashScreen.hide(), 1000);

  return (
    <Navigator />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})