import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

export default function StartScreen({ navigation }) {
  const pressLoginHandler = () => {
    navigation.push('Login');
  }

  const pressSignupHandler = () => {
    alert('Press Sign Up');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.btnArea}
        onPress={pressLoginHandler}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.btnArea}
        onPress={pressSignupHandler}
      >
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  btnText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'NanumSquareR'
  }
})