import React, { useEffect, useState } from 'react';
import { Animated, Easing, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import CustomHeader from '../Components/CustomHeader';

export default function SaveScreen({ navigation }) {
  const apiKey = REACT_APP_API_KEY;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      // MySQL
      // fetch('http://192.168.25.6:4444/save_product')
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //     setData(responseJson);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      selectFoodData();
    }, 2000)

    return () => clearInterval(interval)
  }, []);

  const getMaterialInfo = async (item) => {
    console.log('----------------------------------');
    const response = await fetch(
      'http://openapi.foodsafetykorea.go.kr/api/' + apiKey +
      '/C002/json/1/5/PRDLST_REPORT_NO=' + item.product_num
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
          return;
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      return;
    }
  }
  
  const getMaterialList = async (item) => {
    setLoading(true);           // start loading animation

    const foodMaterial = await getMaterialInfo(item);
    const materialName = await foodMaterial.RAWMTRL_NM;
    var materialList = materialName.split(',');

    // make unique array of raw material DB
    materialList = setArrayUnique(materialList);

    console.log('setMaterialList');
    console.log(item.product_num);
    console.log(item.product_name);
    console.log(materialList);

    await updateFoodData(item);

    const veganList = await getVeganList(materialList);
    // console.log(veganList);

    const findVegan = await checkVegan(materialList, veganList);
    console.log('------------------------------');
    console.log('final');
    // console.log(findVegan);

    setLoading(false);          // finish loading animation

    navigation.navigate('Material', {
      routeName: 'Save',
      barcode: item.barcode,
      foodNum: item.product_num,
      foodName: item.product_name,
      materialList: materialList,
      veganList: findVegan 
    });
  }

  
  const selectFoodData = async() => {
    // firestore
    var response = await firestore().collection('save_product')
      .orderBy('save_date', 'asc')
      .onSnapshot((doc) => {
        const foodList = [];
        doc._docs.map((data) => {
            console.log('save: ', data._data);
            foodList.push(data._data);
          }
        )
        setData(foodList);
      })
  }
  
  const updateFoodData = async (item) => {
    // MySQL
    // await fetch('http://192.168.25.6:4444/product/update', {
    //   method: 'post',
    //   headers: {
    //     'content-type' : 'application/json'
    //   },
    //   body: JSON.stringify({
    //     barcode: item.barcode, 
    //     foodNum: item.product_num,
    //     foodName: item.product_name,
    //   })
    // }).then((res) => res.json());
    
    // firestore
    const productInfo = {
      barcode: item.barcode, 
      product_num: item.product_num, 
      product_name: item.product_name,
      date: firestore.Timestamp.now()
    }
    
    const response = await firestore().collection('product').doc(productInfo.barcode).set(productInfo);
    console.log('insert ', response);
  }

  // select query by server
  const getVeganList = async (materialList) => {
    vegan = [];

    for (i = 0; i < materialList.length; i++) {
      try {
        // MySQL
        // const response = await fetch('http://192.168.25.6:4444/check_vegan/find', {
        //   method: 'post',
        //   headers: {
        //     'content-type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     rawmatList: materialList[i]
        //   })
        // }).then((res) => res.json());
        // vegan.push(response);
        
        // firestore
        var response = await firestore().collection('check_vegan').where('rawmat_name', '==', materialList[i]).get();
        response = response._docs[0];

        if (response == '' || response == null)
          console.log('there is no data');
        else {
          console.log(response._data);
          vegan.push(response._data);
        }

      } catch (err) {
        console.log(err);
      }
    }

    console.log(vegan);
    return vegan;
  }

  const checkVegan = async (materialList, veganList) => {
    var isVegan = [];
    var findVegan;

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
          if (materialList[i] == veganList[j].rawmat_name) {
            findVegan = veganList[j].is_vegan;
            veganInfo = veganList[j].vegan_info;
            // console.log('name in veganList');
            break;
          }
          else {
            findVegan = 0;
            veganInfo = '';
            // console.log('no name in veganList');
          }
        }
        isVegan.push({'name': materialList[i], 'is_vegan': findVegan, 'vegan_info':veganInfo});
      }
    }

    isVegan = setArrayUnique(isVegan);
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


  const getItem = ({ item }) => {
    console.log('getItem');
    console.log(item);
    return (
      // Flat List Item
      <TouchableOpacity 
        style={{ paddingHorizontal: 20 }} 
        onPress={() => getMaterialList(item)}
      >
        <View style={styles.listArea}>
          <View style={styles.textArea}>
            <Text style={styles.listName}>{item.product_name}</Text>
            <Text style={styles.listNum}>Barcode No.{item.barcode}</Text>
            <Text style={styles.listNum}>Product No.{item.product_num}</Text>
          </View>
          {item.is_vegan ? (
            <View style={[styles.imageArea, {marginRight: 40}]}>
              <Image 
                style={{ height: 50, width: 50, resizeMode: 'contain' }}
                source={require('../Images/Icon/vegan_flag_color.png')}
              />
              <Text
                style={{
                  color: 'green',
                  fontSize: 18,
                  fontFamily: 'NanumSquareR',
                  marginTop: 10,
                }}
              >
                Vegan
              </Text>
            </View>
            ) : (
            <View style={styles.imageArea}>
              <Image
                style={{ height: 50, width: 50, resizeMode: 'contain' }}
                source={require('../Images/Icon/vegan_non.png')}
              />
              <Text
                style={{
                  color: 'firebrick',
                  fontSize: 18,
                  fontFamily: 'NanumSquareR',
                  marginTop: 10,
                }}
              >
                Non-Vegan
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const getItemSeparator = () => {
    console.log('getItemSeparator');
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
          flexDirection: 'row'
        }}
      />
    );
  };
  

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingArea}>
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
        <View>
          <CustomHeader title='Save' isHome={true} navigation={navigation} />

          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={getItemSeparator}
            renderItem={getItem}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  listArea: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textArea: {
    marginLeft: 20,
  },
  listName: {
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'dodgerblue',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR'
  },
  listNum: {
    marginBottom: 10,
    justifyContent: 'center',
    color: 'silver',
    fontSize: 12,
    fontFamily: 'NanumSquareR',
    // textAlign: 'center'
  },
  
  imageArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  }
})