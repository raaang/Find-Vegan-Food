import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductScreen({ navigation }) {
  const barcodeValue = navigation.getParam('barcodeValue');
  const apiKey = '85e2be4bc56846348d50';

  const [foodNum, setFoodNum] = useState('');
  const [foodName, setFoodName] = useState('');
  const [materialList, setMaterialList] = useState('');

  console.log('==============================');
  console.log('Barcode: ', barcodeValue.data);

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

  const getMaterialInfo = async (foodNum) => {
    const response = await fetch(
      'http://openapi.foodsafetykorea.go.kr/api/' + apiKey +
      '/C002/json/1/5/PRDLST_REPORT_NO=' + foodNum
    );

    if (response.status == 200) {
      const responseJson = await response.json();
      try {
        const material = await responseJson.C002.row;
        if (material != null) {
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

  const getMaterialList = async () => {
    const foodInfo = await getFoodInfo();
    setFoodNum(foodInfo.PRDLST_REPORT_NO);
    setFoodName(foodInfo.PRDLST_NM);

    const foodMaterial = await getMaterialInfo(foodNum);
    const materialName = foodMaterial.RAWMTRL_NM;
    console.log(materialName);

    setMaterialList(materialName.split(','));
    console.log(materialList);
  }

  const pressHandler = () => {
    navigation.navigate('Material', {
      foodNum: foodNum,
      foodName: foodName, 
      materialList: materialList
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnArea}
        onPress={getMaterialList}
      >
        <Text style={styles.btnText}>Show Product Name</Text>
      </TouchableOpacity>

      <Text>{barcodeValue.type}</Text>
      <Text>{barcodeValue.data}</Text>
      <Text>{foodNum}</Text>
      <Text>{foodName}</Text>

      <TouchableOpacity
        style={styles.btnArea}
        onPress={pressHandler}
      >
        <Text style={styles.btnText}>Show Material</Text>
      </TouchableOpacity>
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
    backgroundColor: 'lightblue'
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'NanumSquareR'
  },
})
