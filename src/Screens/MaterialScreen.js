import React, { useState } from 'react';
import { 
  FlatList, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  useColorScheme, 
  View 
} from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';

export default function MaterialScreen({ navigation }) {
  const foodNum = navigation.getParam('foodNum');
  const foodName = navigation.getParam('foodName');
  const materialList = navigation.getParam('materialList');
  const veganList = navigation.getParam('veganList');

  console.log('==============================');
  console.log('Material Screen');
  console.log(foodNum, foodName);
  console.log('materialList ', materialList);
  console.log('veganList ', veganList);


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
        {showVeganList}
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