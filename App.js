import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navigator from './src/Screens/Navigator';

export default function App() {

  return(
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