import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { parseString } from 'xml2js';

export default function AfterScanScreen({ navigation }) {
  const barcodeValue = navigation.getParam('barcodeValue');
  const apiKey = '85e2be4bc56846348d50';

  console.log('==============================');

  const productInfo = async () => {
    const response = await fetch(
      'http://openapi.foodsafetykorea.go.kr/api/' + apiKey +
      '/C005/json/1/5/BAR_CD=' + barcodeValue.data
    );

    if (response.status == 200) {
      const responseJson = await response.json();
      try {
        const product = await responseJson.C005.row;
        if (product != null) {
          console.log('Product Info: ' + product[product.length - 1]);
          console.log('--------------------------');
        } else {
          alert('Can\'t find product');
        }
      } catch (err) {
        alert(err);
      }
    }
  }

  const result = async () => {
    const productName = await productInfo();
    console.log('Barcode: '+productName.BAR_CD, 'Name: '+productName.PRDLST_NM);
  }

  result();

  return (
    <View style={styles.container}>
      <Text>{barcodeValue.type}</Text>
      <Text>{barcodeValue.data}</Text>
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
