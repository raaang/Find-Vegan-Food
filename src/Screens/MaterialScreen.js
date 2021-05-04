import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MaterialScreen({ navigation }) {
  const food = navigation.getParam('foodNum', 'foodName', 'materialList');
  
  console.log('==============================');
  console.log('Material Screen');
  console.log(food[0]);
  console.log(food[1]);
  console.log(food[2]);

  return (
    <View style={styles.container}>
      <Text>Show Material</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})