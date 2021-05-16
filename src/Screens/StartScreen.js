import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../Components/CustomHeader';

export default function StartScreen({ navigation }) {
  const pressLoginHandler = () => {
    // console.log('press Login');
    navigation.navigate('Login');
  }

  const pressSignupHandler = () => {
    navigation.navigate('SignUp');
    // console.log('press SignUp');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title='Start' isHome={true} navigation={navigation} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.loginArea}
          onPress={(pressLoginHandler)}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.singUpArea}
          onPress={pressSignupHandler}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  }
})