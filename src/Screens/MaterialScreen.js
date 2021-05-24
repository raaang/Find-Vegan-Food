import React, { useState } from 'react';
import { Alert, Animated, Easing, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomHeader from '../Components/CustomHeader';

export default function MaterialScreen({ route, navigation }) {
  const { barcode } = route.params;
  const { foodNum } = route.params;
  const { foodName } = route.params;
  const { materialList } = route.params;
  const { veganList } = route.params;
  const { routeName } = route.params;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  var isSearch;
  if (routeName == 'Search Product')
    isSearch = <CustomHeader title='Raw Material' isHome={false} isSearch={true} navigation={navigation} />
  else
    isSearch = <CustomHeader title='Raw Material' isHome={false} navigation={navigation} />

  console.log('==============================');
  console.log('Material Screen');
  console.log(barcode, foodNum, foodName);
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
    Alert.alert('Alert', 'Do you want to save this product?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: pressOkHandler},
      ]
    )
  }

  const pressOkHandler = async () => {
    console.log('Ok Pressed');
    setLoading(true);
    await selectSaveData();
    
    console.log('----------------------------------');
    console.log('dataLength', data.length);
    if (data.length == 0) {
      insertSaveData();
      console.log('insert')
    } else {
      console.log('already have data');
    }

    setLoading(false);
    navigation.navigate('Save', {
      saveList: data
    });
  }

  const selectSaveData = async () => {
    console.log('----------------------------------');
    console.log('Select Data');
    const response = await fetch('http://192.168.25.6:4444/save_product/find', {
      method: 'post',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        product_num: foodNum
      })
    }).then((res) => res.json());
    setData(response);
    console.log(data);
  }

  const insertSaveData = async () => {
    console.log('----------------------------------');
    console.log('insert Data');
    await fetch('http://192.168.25.6:4444/save_product/insert', {
      method: 'post',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        barcode: barcode,
        product_num: foodNum,
        product_name: foodName
      })
    }).then((res) => res.json());
  }
  
  // loading animation
  const animatedRotation = new Animated.Value(0);

  const rotation = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  
  if (loading) {
    Animated.loop(
      Animated.timing(animatedRotation, {
        toValue: 1,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start()
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isSearch}
      
      {loading ? (
        <View style={styles.container}>
          <Animated.Image
            source={require('../Images/Icon/loader_120px.png')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              transform: [{ rotate: rotation }]
            }}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

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
      )}
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