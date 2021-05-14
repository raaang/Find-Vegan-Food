import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../Components/CustomHeader';

export default function LoginScreen({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Barcode');
  }

  const pressSignupHandler = () => {
    navigation.navigate('SignUp');
    // console.log('press SignUp');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title='Login' isHome={false} navigation={navigation} />
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

        <TouchableOpacity
          style={styles.loginArea}
          onPress={pressHandler}
        >
          <Text style={styles.btnText}>Sign In</Text>
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

  loginArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    padding: 10,
    marginBottom: '5%',
    borderRadius: 5,
    backgroundColor: 'cornflowerblue'
  },
  singUpArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    padding: 10,
    marginBottom: '5%',
    borderRadius: 5,
    backgroundColor: 'silver'
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR'
  },

  inputView:{
    justifyContent: 'center',
    width: '60%',
    height: 50,
    marginBottom: '5%',
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'lightblue',
    // backgroundColor:"#6782C0",
    // backgroundColor: '#6586D0',
    // backgroundColor: '#7A99DE',
  },
  inputText:{
    paddingHorizontal: 20,
    color: 'black',
    height: 50,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR',
  }
})