import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcon from 'react-native-vector-icons/Ionicons'
import SearchScreen from '../Screens/SearchScreen';

export default function CustomHeader({title, isHome, navigation}) {
  const pressBackHandler = () => {
    navigation.goBack();
  }

  const pressMenuHandler = () => {
    navigation.openDrawer();
  }

  const pressSearchHandler = () => {
    alert('search');
    // navigation.navigate('Search');
  }

  return (
    <View style={styles.container}>
      {/* <SearchScreen /> */}
      
      { isHome ? (
        <View style={styles.left}>
          <TouchableOpacity style={styles.menu} onPress={pressMenuHandler}>
            <IonIcon name="menu" size={30} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.left}>
          <TouchableOpacity style={styles.back} onPress={pressBackHandler}>
            <IonIcon name='chevron-back' size={30} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.middle}>
        <Text style={{ textAlign: 'center' }}>{title}</Text>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.search} onPress={pressSearchHandler}>
          <IonIcon name="search" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
  },

  left: {
    flex: 1,
    justifyContent: 'center',
  },
  back: { 
    width: 35, 
    height: 35, 
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  menu: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },

  middle: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  search: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginHorizontal: 10,
  }
})