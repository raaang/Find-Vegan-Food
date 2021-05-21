import React, { useEffect, useState } from 'react';
import { Animated, Button, Easing, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../Components/CustomHeader';

export default function ProductScreen({ route, navigation }) {
  // const barcodeValue = navigation.getParam('barcodeValue');
  // const barcodeValue = JSON.stringify(barcodeValue);
  const { barcodeValue } = route.params;
  console.log(barcodeValue);
  const apiKey = '85e2be4bc56846348d50';

  const [foodNum, setFoodNum] = useState('');
  const [foodName, setFoodName] = useState('');

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  
  var vegan = [];
  var i, j;

  console.log('==============================');

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

  const [food, setFood] = useState([]);
  const [material, setMaterial] = useState([]);

  // useEffect(() => {
  //   fetch('http://openapi.foodsafetykorea.go.kr/api/' + apiKey +
  //   '/C005/json/1/5/BAR_CD=' + barcodeValue.data
  //   ).then((response) => response.json())
  //   .then((responseJson) => {
  //     const foodList = responseJson.C005.row;
  //     setFood(foodList[foodList.length - 1]);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   })
  // }, []);

  // setFoodNum(food.PRDLST_REPORT_NO);
  // setFoodName(food.PRDLST_NM);

  // useEffect(() => {
  //   fetch('http://openapi.foodsafetykorea.go.kr/api/' + apiKey +
  //   '/C002/json/1/5/PRDLST_REPORT_NO=' + foodNumber
  //   ).then((response) => response.json())
  //   .then((responseJson) => {
  //     const materialList = responseJson.C002.row;
  //     setMaterial(materialList[materialList.length - 1]);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }, []);

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

    selectFoodData();
  }

  const getMaterialList = async () => {
    setLoading(true);           // start loading animation

    const foodMaterial = await getMaterialInfo(foodNum);
    const materialName = await foodMaterial.RAWMTRL_NM;
    var materialList = materialName.split(',');
    
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
    // console.log(veganList);

    const findVegan = await checkVegan(materialList, veganList);
    console.log('------------------------------');
    console.log('final');
    // console.log(findVegan);

    setLoading(false);          // finish loading animation

    navigation.navigate('Material', {
      routeName: 'Product',
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
    // setData(responseJson);
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
    // console.log(data);
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
      // console.log(materialList[i]);
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

        // console.log(response);
        vegan.push(response);
        // console.log('1', vegan);
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
    // console.log(isVegan.length);
    // console.log(isVegan);

    // console.log(materialList);
    // console.log(materialList.length);
    // console.log(veganList);
    // console.log(veganList.length);

    // there is no raw material info in DB
    if (veganList.length == 0) {
      for (i = 0; i < materialList.length; i++) {
        isVegan.push([materialList[i], 0]);
      }
    }
    // there is raw material info in DB
    else {
      for (i = 0; i < materialList.length; i++) {
        for (j = 0; j < veganList.length; j++) {
          // console.log(i, j);
          if (materialList[i] == veganList[j].rawmat_name) {
            findVegan = veganList[j].is_vegan;
            // console.log('name in veganList');
            break;
            // if (j != veganList.length - 1) {
            //   console.log('break');
            //   console.log('------------------------------');
            //   break;
            // }
          }
          else {
            findVegan = 0;
            // console.log('no name in veganList');
          }
        }
        isVegan.push([materialList[i], findVegan])
        // console.log(isVegan);
        // console.log('------------------------------');
      }
    }

    console.log(isVegan.length);
    console.log(isVegan);
    return isVegan;
  }

  const setArrayUnique = (array) => {
    
    // const set = new Set(array);
    // const uniqueArr = [...set];

    // const uniqueArr = array.filter((element, idx) => {
    //   return vegan.indexOf(element) === idx;
    // });

    // const uniqueArr = array.reduce((prev, now) => {
    //   if (!prev.some(obj => obj[0] !== now[0] )) {
    //     prev.push(now);
    //     console.log('push');
    //   }
    //   return prev;
    // }, []);

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
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title='Product' isHome={false} navigation={navigation} />
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
          <Text style={styles.titleText}>Barcode: {barcodeValue.data}</Text>
          <Text style={styles.titleText}>{foodName}</Text>
          <Text></Text>

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
    </SafeAreaView>
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
