// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, TouchableOpacity, Animated, Easing } from 'react-native';
import { SearchBar } from 'react-native-elements';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../Components/CustomHeader';

const Search = ({ navigation }) => {
  const apiKey = '85e2be4bc56846348d50';

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  
  var vegan = [];
  var i, j;

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
    fetch('http://192.168.25.6:4444/product')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    }, 5000)

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
      foodNum: item.product_num,
      foodName: item.product_name,
      materialList: materialList,
      veganList: findVegan 
    });
  }

  
  const updateFoodData = async (item) => {
    await fetch('http://192.168.25.6:4444/product/update', {
      method: 'post',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        barcode: item.barcode, 
        foodNum: item.product_num,
        foodName: item.product_name,
      })
    }).then((res) => res.json());
  }

  // select query by server
  const getVeganList = async (materialList) => {
    vegan = [];

    for (i = 0; i < materialList.length; i++) {
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
    var isVegan = [];
    var findVegan;

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
          if (materialList[i] == veganList[j].rawmat_name) {
            findVegan = veganList[j].is_vegan;
            // console.log('name in veganList');
            break;
          }
          else {
            findVegan = 0;
            // console.log('no name in veganList');
          }
        }
        isVegan.push([materialList[i], findVegan])
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
