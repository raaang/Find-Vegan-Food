import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons'

export default function CustomHeader({ title, isHome, isSearch, navigation }) {
  const pressBackHandler = () => {
    navigation.goBack();
  }

  const pressMenuHandler = () => {
    navigation.openDrawer();
  }

  const pressSearchHandler = () => {
    navigation.navigate('Search Product');
  }

  return (
    <View style={styles.container}>
      {/* <SearchScreen /> */}

      {isHome ? (
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

      {isSearch ? (
        <View style={styles.right}>
          <View>

          </View>
        </View>
      ) : (
        <View style={styles.right}>
          <TouchableOpacity style={styles.search} onPress={pressSearchHandler}>
            <IonIcon name="search" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      )}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    zIndex: 1000,
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
  },
})