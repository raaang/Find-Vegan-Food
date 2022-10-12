// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import CustomHeader from '../Components/CustomHeader';

const Search = ({ navigation }) => {
  const apiKey = REACT_APP_API_KEY;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

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

  
  var vegan = [];
  var i, j;

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // MySQL
      // fetch('http://192.168.25.6:4444/product')
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //     setFilteredDataSource(responseJson);
      //     setMasterDataSource(responseJson);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      selectFoodData();
    }, 1000)

    return () => clearInterval(interval)
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.product_name
          ? item.product_name
          : ''
        const textData = text
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const getItem = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity onPress={() => getMaterialList(item)}>
        <Text style={styles.listName}>{item.product_name}</Text>
        <Text style={styles.listNum}>
          Barcode No.{item.barcode}
          {' / '}
          Product No.{item.product_num}
        </Text>
      </TouchableOpacity>
    );
  };

  const getItemSeparator = () => {
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

  const pressItemHandler = (item) => {
    // Function for click on an item
    alert('Name : ' + item.product_name + ' Barcode : ' + item.barcode);
  };

  const getMaterialInfo = async (item) => {
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

    updateFoodData(item);

    const veganList = await getVeganList(materialList);
    // console.log(veganList);

    const findVegan = await checkVegan(materialList, veganList);
    console.log('------------------------------');
    console.log('final');
    // console.log(findVegan);

    setLoading(false);          // finish loading animation

    navigation.navigate('Material', {
      routeName: 'Search Product',
      barcode: item.barcode,
      foodNum: item.product_num,
      foodName: item.product_name,
      materialList: materialList,
      veganList: findVegan 
    });
  }


  const selectFoodData = async() => {
    // firestore
    var response = await firestore().collection('product')
      .orderBy('date', 'desc')
      .onSnapshot((doc) => {
        const foodList = [];
        doc._docs.map((data) => {
            console.log('search: ', data._data);
            foodList.push(data._data);
          }
        )
        setFilteredDataSource(foodList);
        setMasterDataSource(foodList);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>

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
        <View style={styles.container}>
          <CustomHeader title='' isHome={false} isSearch={true} navigation={navigation} />
          <SearchBar
            round
            lightTheme
            containerStyle={{ justifyContent: 'center' }}
            // inputStyle={{height: 30}}
            searchIcon={{ size: 24 }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Search Product Name"
            value={search}
          />
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={getItemSeparator}
            renderItem={getItem}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // flexDirection: 'row',
  },
  loadingArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listName: {
    padding: 10,
    paddingLeft: 30,
    justifyContent: 'center',
    fontSize: 17,
    fontFamily: 'NanumSquareR'
  },
  listNum: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    color: 'silver',
    fontSize: 12,
    fontFamily: 'NanumSquareR',
    // textAlign: 'center'
  }
});

export default Search;
