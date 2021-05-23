import React, { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomHeader from '../Components/CustomHeader';

export default function MaterialScreen({ route, navigation }) {
  const { foodNum } = route.params;
  const { foodName } = route.params;
  const { materialList } = route.params;
  const { veganList } = route.params;
  const { routeName } = route.params;

  var isSearch;
  if (routeName == 'Search Product')
    isSearch = <CustomHeader title='Raw Material' isHome={false} isSearch={true} navigation={navigation} />
  else
    isSearch = <CustomHeader title='Raw Material' isHome={false} navigation={navigation} />

  console.log('==============================');
  console.log('Material Screen');
  console.log(foodNum, foodName);
  console.log('materialList ', materialList);
  console.log('veganList ', veganList);
  console.log('previousRouteName: ', routeName);

  const showVeganList = veganList.map(
    (raw, idx) => {
      return (
        <View key={idx}>
          <View style={styles.materialArea}>
            <Text style={styles.materialText}>{raw[0]}</Text>
            {/* <Text style={styles.materialText}>{raw[1]}</Text> */}
            {raw[1] ? (
              <TouchableOpacity style={styles.veganArea}>
                <Text style={styles.veganText}>Vegan</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.nonVeganArea}>
                <Text style={styles.veganText}>Non-Vegan</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )
    }
  )
  
  // status bar
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const pressTitleHandler = () => {
    navigation.navigate('Save');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isSearch}
      <View style={styles.container}>
        <StatusBar barStyle={
          isDarkMode ? 'light-content' : 'dark-content'
        }
        />

        <TouchableOpacity style={styles.titleArea} onPress={pressTitleHandler}>
          <Text style={styles.titleText}>{foodName}</Text>
          <View style={styles.foodNumArea}>
            <Text style={styles.foodNumText}>Product No. {foodNum}</Text>
          </View>
        </TouchableOpacity>

        <ScrollView style={styles.listArea}>
          {showVeganList}
        </ScrollView>
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

  titleArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '10%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'aliceblue'
  },
  titleText: {
    color: 'dodgerblue',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR'
  },

  foodNumArea: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  foodNumText: {
    color: 'black',
    fontSize: 10,
    fontFamily: 'NanumSquareR'
  },

  listArea: {
    width: '100%',
  },
  materialArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 10,
    padding: 15,
    paddingLeft: 20,
    // borderWidth: 1,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  materialText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'NanumSquareR'
  },

  veganArea: {
    alignItems: 'center',
    // justifyContent: 'center',
    width: '35%',
    padding: 5,
    borderRadius: 25,
    backgroundColor: 'green'
  },
  nonVeganArea: {
    alignItems: 'center',
    // justifyContent: 'center',
    width: '35%',
    padding: 5,
    borderRadius: 25,
    backgroundColor: 'firebrick'
  },
  veganText: {
    alignItems: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR'
  },

})