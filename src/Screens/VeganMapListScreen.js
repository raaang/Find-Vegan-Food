import React, { useEffect, useState } from 'react';
import { Animated, Easing, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import veganRestaurant from '../서울시 지정·인증업소 현황.json';
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyC3PVo3MBYaNqy9Dw2ra55IOowxE7VWsFI');
Geocode.setLanguage('ko');
// Geocode.setRegion('es');
Geocode.enableDebug();

export default function VeganMapListScreen({navigation}) {
  console.log('==============================');
  const restList = veganRestaurant.DATA;
  var veganRest = [];
  const [geo, setGeo] = useState([]);

  const [loading, setLoading] = useState(false);

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

  // find vegan restaurant name, address
  restList.map((rest, idx) => {
    var rest_addr;
    if (rest.crtfc_gbn_nm == '채식음식점') {
      if (rest.rdn_detail_addr)
        rest_addr = rest.rdn_code_nm + ' ' + rest.rdn_detail_addr;
      else rest_addr = rest.rdn_code_nm;

      console.log(rest.rdn_code_nm);

      veganRest.push({
        rest_name: rest.upso_nm,
        rest_menu: rest.food_menu,
        rest_flag: rest.crtfc_gbn_nm,
        rest_addr: rest_addr,
      });
    }
  });

  // console.log(veganRest);
  console.log(veganRest.length);
  veganRest = setArrayUnique(veganRest);
  console.log(veganRest.length);
  
  console.log('----------------------------');

  const getGeocode = async address => {
    // console.log('getGeocode: ', address);

    try {
      const response = await Geocode.fromAddress(address);
      const result = await response.results;
      const {lat, lng} = await result[result.length - 1].geometry.location;
      return {lat, lng};
    } catch (error) {
      console.log('error');
    }
  };

  const getCode = async () => {
    const geoList = [];

    var i;
    for (i = 0; i < veganRest.length; i++) {
      // console.log(i);
      const {lat, lng} = await getGeocode(veganRest[i].rest_addr);
      console.log({lat, lng});
      geoList.push({lat, lng});
    }
    setGeo(geoList);
  };

  useEffect(() => {
    setLoading(true);
    getCode();
    setLoading(false);
  }, []);

  console.log('geoList');
  console.log(geo);
  console.log(geo.length);

  const getItem = ({ item }) => {
    console.log('getItem');
    console.log(item);
    return (
      // Flat List Item
      <TouchableOpacity onPress={() => getMaterialList(item)}>
        <Text style={styles.listName}>{item.rest_name}</Text>
        <Text style={styles.listAddr}>{item.rest_addr}</Text>
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

  const showRestList = veganRest.map(
    (rest, idx) => {
      return (
        <View key={idx}>
          <View style={styles.listArea}>
            <Text style={styles.listName}>{rest.rest_name}</Text>
            <Text style={styles.listAddr}>{rest.rest_addr}</Text>
          </View>
        </View>
      );
    }
  )
  

  return (
    <SafeAreaView style={styles.container}>

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
          {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
          <CustomHeader title="Vegan Restaurant List" isHome={true} navigation={navigation} />

          {/* <ScrollView>
            {showRestList}
          </ScrollView> */}

          <FlatList
            data={veganRest}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={getItemSeparator}
            renderItem={getItem}
          />
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

  listArea: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  listName: {
    padding: 10,
    paddingLeft: 30,
    justifyContent: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR',
  },
  listAddr: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    color: 'silver',
    fontSize: 12,
    fontFamily: 'NanumSquareR',
    // textAlign: 'center'
  }
})