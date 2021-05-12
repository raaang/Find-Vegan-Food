import React, { useState } from 'react';
import { Animated, Button, Easing, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductScreen({ navigation }) {
  const barcodeValue = navigation.getParam('barcodeValue');
  const apiKey = '85e2be4bc56846348d50';

  const [foodNum, setFoodNum] = useState('');
  const [foodName, setFoodName] = useState('');

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  
  var vegan = [];
  // var isVegan = [];

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

    getData();
  }

  const getMaterialList = async () => {
    setLoading(true);           // start loading animation

    const foodMaterial = await getMaterialInfo(foodNum);
    const materialName = await foodMaterial.RAWMTRL_NM;
    const materialList = materialName.split(',');

    console.log('setMaterialList');
    console.log(foodNum);
    console.log(foodName);
    console.log(materialList);

    postData();
    getData();

    const veganList = await getVeganList(materialList);
    // console.log(veganList);

    const findVegan = await checkVegan(materialList, veganList);
    console.log('------------------------------');
    console.log('final');
    // console.log(findVegan);

    setLoading(false);          // finish loading animation

    navigation.navigate('Material', {
      foodNum: foodNum,
      foodName: foodName,
      materialList: materialList,
      veganList: findVegan 
    });
  }

  // select query by server
  const getData = async () => {
    const response = await fetch('http://192.168.25.6:4444/product');
    const responseJson = await response.json();
    setData(responseJson);
  }

  // insert query by server
  const postData = async () => {
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

  
  // select query by server
  const getVeganList = async (materialList) => {
    console.log('------------------------------');
    console.log('getVeganList');
    console.log('material ',materialList);
    var i;

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

        console.log(response);
        vegan.push(response);
        console.log('1', vegan);
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
    var i, j;
    var isVegan = [];
    // console.log(isVegan.length);
    // console.log(isVegan);

    // console.log(materialList);
    // console.log(materialList.length);
    // console.log(veganList);
    console.log(veganList.length);

    console.log('------------------------------');
    if (veganList.length == 0) {
      for (i=0; i<materialList.length; i++) {
        isVegan.push([materialList[i], 0]);
      }
    } else {
      for (j = 0; j < veganList.length; j++) {
        for (i = j; i < materialList.length; i++) {
          console.log(j, i);
          if (materialList[i] == veganList[j].rawmat_name) {
            isVegan.push([materialList[i], veganList[j].is_vegan]);
            // console.log('name in veganList');
            if (j != veganList.length - 1) {
              // console.log('break');
              // console.log('------------------------------');
              break;
            }
          }
          else {
            isVegan.push([materialList[i], 0]);
            // console.log('no name in veganList');
          }
        }
      }
    }

    console.log(isVegan.length);
    console.log(isVegan);
    return isVegan;
  }



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

          {/* <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View>
                  <Text>{item.user_name}</Text>
                </View>
              }
            />
          </View> */}

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
