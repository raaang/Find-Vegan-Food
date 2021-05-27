import React from 'react';
import { Text, View } from 'react-native';

export default function InitScreen() {

  return (
    <View style={styles.container}>
      <Text>Init Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
});