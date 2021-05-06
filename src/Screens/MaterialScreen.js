import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function MaterialScreen({ navigation }) {
  const foodNum = navigation.getParam('foodNum');
  const foodName = navigation.getParam('foodName');
  const materialList = navigation.getParam('materialList');
  
  console.log('==============================');
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

  return (
    <View style={styles.container}>
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