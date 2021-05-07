import React, { useState } from 'react';
import { Animated, Button, Easing, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductScreen({ navigation }) {
  const barcodeValue = navigation.getParam('barcodeValue');
  const apiKey = '85e2be4bc56846348d50';

  const [foodNum, setFoodNum] = useState('');
  const [foodName, setFoodName] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('==============================');

  const getFoodInfo = async () => {
    const response = await fetch(
      'http://openapi.foodsafetykorea.go.kr/api/' + apiKey +
      '/C005/json/1/5/BAR_CD=' + barcodeValue.data
    );

    if (response.status == 200) {
      const responseJson = await response.json();
      try {
        const food = await responseJson.C005.row;
        if (food != null) {
          console.log('------------------------------');
          console.log('Product Info: ', food[food.length - 1]);

          return food[food.length - 1];
        } else {
          alert('Can\'t find product');
          return ;
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      return ;
    }
  }

  const getMaterialInfo = async (foodNumber) => {
    const response = await fetch(
      'http://openapi.foodsafetykorea.go.kr/api/' + apiKey +
      '/C002/json/1/5/PRDLST_REPORT_NO=' + foodNumber
    );

    if (response.status == 200) {
      const responseJson = await response.json();
      try {
        const material = await responseJson.C002.row;
        if (material != null || material != '') {
          console.log('------------------------------');
          console.log('Material Info: ', material[material.length - 1]);

          return material[material.length - 1];
        } else {
          alert('Can\'t find product material');
          return ;
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      return ;
    }
  }

  const getFoodName = async () => {
    const foodInfo = await getFoodInfo();
    setFoodNum(foodInfo.PRDLST_REPORT_NO);
    setFoodName(foodInfo.PRDLST_NM);
  }

  const getMaterialList = async () => {
    setLoading(true);           // start loading animation

    const foodMaterial = await getMaterialInfo(foodNum);
    const materialName = await foodMaterial.RAWMTRL_NM;
    const materialList = materialName.split(',');

    console.log(foodNum);
    console.log(foodName);
    console.log(materialList);

    setLoading(false);          // finish loading animation

    navigation.navigate('Material', {
      foodNum: foodNum,
      foodName: foodName, 
      materialList: materialList
    });
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

  // get DB by server
  const [data, setData] = useState('');

  const getData = async () => {
    const response = await fetch('http://192.168.25.6:4444/member');
    const responseJson = await response.json();
    setData(responseJson);
  }

  getData();

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.container}>
          <Animated.Image
            source={require('../Images/spinner_blue.png')}
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
          <Text style={styles.titleText}>Barcode: {barcodeValue.data}</Text>
          <Text style={styles.titleText}>{foodName}</Text>
          <Text></Text>

          <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View>
                  <Text>{item.user_name}</Text>
                </View>
              }
            />
          </View>

          <TouchableOpacity
            style={styles.btnArea}
            onPress={getFoodName}
          >
            <Text style={styles.btnText}>Show Product Name</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnArea}
            onPress={getMaterialList}
          >
            <Text style={styles.btnText}>Show Material</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  btnArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    padding: 10,
    marginBottom: '5%',
    borderRadius: 5,
    backgroundColor: 'cornflowerblue'
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR'
  },
  
  titleArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray'
  },
  titleText: {
    color: 'dodgerblue',
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR'
  },
})
