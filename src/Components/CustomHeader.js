import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CustomHeader({title, isHome, navigation}) {
  const pressBackHandler = () => {
    navigation.goBack();
  }

  const pressMenuHandler = () => {
    navigation.openDrawer();
  }

  return (
    <View style={styles.container}>
      { isHome ? (
        <View style={styles.left}>
          <TouchableOpacity onPress={pressMenuHandler}>
            <Image style={styles.menu}
              source={require('../Images/Icon/menu.png')}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.left}>
          <TouchableOpacity onPress={pressBackHandler}>
            <Image style={styles.back}
              source={require('../Images/Icon/left-arrow.png')}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.middle}>
        <Text style={{ textAlign: 'center' }}>{title}</Text>
      </View>
      <View style={styles.right}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
  },
  middle: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  back: { 
    width: 30, 
    height: 30, 
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  menu: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginHorizontal: 10,
  }
})