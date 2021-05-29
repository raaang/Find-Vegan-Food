import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomHeader from '../Components/CustomHeader';

export default function HowToUseScreen({ navigation }) {
  return (
    <View>
      <CustomHeader title="Vegan Restaurant List" isHome={true} navigation={navigation} />
      <Text>How To Use</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});