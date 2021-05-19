import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../Components/CustomHeader';

export default function SignUpScreen({ navigation }) {

  const pressHandler = () => {
    alert('Finish Sign Up');
    navigation.push('Login');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="Sign Up" isHome={false} navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='ID'
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Password'
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Email'
          />
        </View>

        <TouchableOpacity
          style={styles.btnArea}
          onPress={pressHandler}
        >
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    padding: 10,
    marginBottom: '5%',
    borderRadius: 5,
    backgroundColor: 'lightblue'
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'NanumSquareR'
  },
  inputView:{
    justifyContent: 'center',
    width: '60%',
    // backgroundColor:"#6782C0",
    backgroundColor: '#6586D0',
    // backgroundColor: '#7A99DE',
    marginBottom: '5%',
    borderRadius: 25,
    height: 50,
    padding: 20,
  },
  inputText:{
    color: 'white',
    height: 50,
    fontSize: 15,
    fontFamily: 'NanumSquareR',
  }
})