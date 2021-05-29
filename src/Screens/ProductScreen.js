import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, Easing, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../Components/CustomHeader';

export default function ProductScreen({ route, navigation }) {
  const { barcodeValue } = route.params;
  const apiKey = '85e2be4bc56846348d50';

  const [foodNum, setFoodNum] = useState('');
  const [foodName, setFoodName] = useState('');

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  
  var vegan = [];
  var i, j;

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

  const animatedFadeIn = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(animatedFadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

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
          navigation.goBack();
          return ;
        }
      } catch (err) {
        console.log(err);
        // console.warn(err);
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
          setLoading(false); 
          alert('Can\'t find product material');
          navigation.goBack();
          return ;
        }
      } catch (err) {
        console.log(err);
        // console.warn(err);
      }
    } else {
      return ;
    }
  }

  const getFoodName = async () => {
    const foodInfo = await getFoodInfo();
    setFoodNum(foodInfo.PRDLST_REPORT_NO);
    setFoodName(foodInfo.PRDLST_NM);

    selectFoodData();
    fadeIn();
  }

  const getMaterialList = async () => {
    setLoading(true);           // start loading animation

    const foodMaterial = await getMaterialInfo(foodNum);
    try {
      if (foodMaterial) {
        const materialName = await foodMaterial.RAWMTRL_NM;
        var materialList = materialName.split(',');
      } else {
        setLoading(false); 
        alert('Can\'t find product material');
        navigation.goBack();
        return ;
      }
    } catch (err) {
      console.log(err);
    }
    
    // make unique array of raw material DB
    materialList = setArrayUnique(materialList);

    console.log('setMaterialList');
    console.log(foodNum);
    console.log(foodName);
    console.log(materialList);

    selectFoodData();
    console.log('dataLength', data.length);
    if (data.length == 0) {
      insertFoodData();
    } else {
      updateFoodData();
    }

    const veganList = await getVeganList(materialList);
    const findVegan = await checkVegan(materialList, veganList);
    console.log('------------------------------');
    console.log('final');

    setLoading(false);          // finish loading animation

    navigation.navigate('Material', {
      routeName: 'Product',
      barcode: barcodeValue.data,
      foodNum: foodNum,
      foodName: foodName,
      materialList: materialList,
      veganList: findVegan 
    });
  }

  // select query by server
  const selectAllFoodData = async () => {
    const response = await fetch('http://192.168.25.6:4444/product');
    const responseJson = await response.json();
    console.log(responseJson);
  }

  const selectFoodData = async () => {
    console.log('select Data');
    const response = await fetch('http://192.168.25.6:4444/product/find', {
      method: 'post',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        barcode: barcodeValue.data
      })
    }).then((res) => res.json());
    setData(response);
  }

  // insert query by server
  const insertFoodData = async () => {
    console.log('insert Data');
    await fetch('http://192.168.25.6:4444/product/insert', {
      method: 'post',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        barcode: barcodeValue.data, 
        foodNum: foodNum, 
        foodName: foodName
      })
    }).then((res) => res.json());
  }

  const updateFoodData = async () => {
    await fetch('http://192.168.25.6:4444/product/update', {
      method: 'post',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        barcode: barcodeValue.data, 
        foodNum: foodNum, 
        foodName: foodName
      })
    }).then((res) => res.json());
  }

  
  // select query by server
  const getVeganList = async (materialList) => {
    console.log('------------------------------');
    console.log('getVeganList');
    console.log('material ',materialList);

    console.log('------------------------------');
    vegan = [];
    console.log('vegan', vegan);

    for (i = 0; i < materialList.length; i++) {
      console.log('------------------------------');
      try {
        const response = await fetch('http://192.168.25.6:4444/check_vegan/find', {
          method: 'post',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            rawmatList: materialList[i]
          })
        }).then((res) => res.json());
        vegan.push(response);
      } catch (err) {
        console.log(err);
      }
    }
    
    console.log(vegan);
    return vegan;
  }
  
  const checkVegan = async (materialList, veganList) => {
    console.log('------------------------------');
    console.log('checkVegan');
    var isVegan = [];
    var findVegan;
    var veganInfo;
    
    // there is no raw material info in DB
    if (veganList.length == 0) {
      for (i = 0; i < materialList.length; i++) {
        isVegan.push({'name': materialList[i], 'is_vegan': findVegan, 'vegan_info': ''});
      }
    }
    // there is raw material info in DB
    else {
      for (i = 0; i < materialList.length; i++) {
        for (j = 0; j < veganList.length; j++) {
          // classify vegan or non-vegan
          if (materialList[i] == veganList[j].rawmat_name) {
            findVegan = veganList[j].is_vegan;
            veganInfo = veganList[j].vegan_info;
            break;
          }
          else {
            findVegan = 0;
            veganInfo = '';
          }
        }
        isVegan.push({'name': materialList[i], 'is_vegan': findVegan, 'vegan_info':veganInfo});
      }
    }

    console.log(isVegan.length);
    console.log(isVegan);
    return isVegan;
  }

  const setArrayUnique = (array) => {
    var uniques = [];
    var itemsFound = {};

    for(var i = 0, l = array.length; i < l; i++) {
        var stringified = JSON.stringify(array[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(array[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
  }


  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="Product" isHome={false} navigation={navigation} />
      {loading ? (
        <View style={styles.container}>
          <Animated.Image
            source={require('../Images/Icon/loader_120px.png')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              transform: [{rotate: rotation}],
            }}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Animated.View
            style={[styles.titleArea, {
              opacity: animatedFadeIn,
            }]}
          >
            <Text style={styles.titleText}>{foodName}</Text>
          </Animated.View>

          {/* <Text></Text> */}

          <TouchableOpacity style={styles.btnArea} onPress={getFoodName}>
            <Text style={styles.btnText}>Show Product Name</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnArea} onPress={getMaterialList}>
            <Text style={styles.btnText}>Show Material</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
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
    padding: 20,
    marginBottom: '5%',
    backgroundColor: 'powderblue',
  },
  titleText: {
    color: 'dodgerblue',
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR'
  },
})
