import React, { useState } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';

export default function MaterialScreen({ navigation }) {
  const foodNum = navigation.getParam('foodNum');
  const foodName = navigation.getParam('foodName');
  const materialList = navigation.getParam('materialList');

  console.log('------------------------------');
  console.log('Material Screen');
  console.log(foodNum);
  console.log(foodName);
  console.log(materialList);

  const showMaterialList = materialList.map(
    (mat, idx) => {
      return (
        <View style={styles.materialArea} key={idx}>
          <Text style={styles.materialText}>{mat}</Text>
        </View>
      )
    }
  )
  
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={styles.container}>
    {/* <Header /> */}
      <StatusBar barStyle={
        isDarkMode ? 'light-content' : 'dark-content'
        } 
      />
      
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>{foodName}</Text>
        <View style={styles.foodNumArea}>
          <Text style={styles.foodNumText}>Product No. {foodNum}</Text>
        </View>
      </View>

      <ScrollView style={styles.listArea}>
        {showMaterialList}
      </ScrollView>
    </View>
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
    // borderWidth: 1,
    // borderColor: 'gray'
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
    justifyContent: 'center',
    marginVertical: 10,
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: 'gray'
  },
  materialText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'NanumSquareR'
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
  },

})