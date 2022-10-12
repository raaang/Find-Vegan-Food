import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import veganRestaurant from '../서울시 지정·인증업소 현황.json';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API_KEY);
Geocode.setLanguage('ko');
// Geocode.setRegion('es');
Geocode.enableDebug();

export default function VeganMapListScreen({ navigation }) {
  console.log('==============================');
  const restList = veganRestaurant.DATA;
  var veganRest = [];
  const [geo, setGeo] = useState([]);

  const setArrayUnique = array => {
    var uniques = [];
    var itemsFound = {};

    for (var i = 0, l = array.length; i < l; i++) {
      var stringified = JSON.stringify(array[i]);
      if (itemsFound[stringified]) {
        continue;
      }
      uniques.push(array[i]);
      itemsFound[stringified] = true;
    }
    return uniques;
  };

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

  const getGeocode = async (address) => {
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

  const getLatLng = async () => {
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

  // useEffect(() => {
  //   getGeocode();
  // }, []);

  console.log('geoList');
  console.log(geo);
  console.log(geo.length);

  const getItem = ({ item }) => {
    console.log('getItem');
    console.log(item);
    return (
      // Flat List Item
      <TouchableOpacity onPress={() => pressListHandler(item)}>
        <View style={styles.listArea}>
          <Text style={styles.listName}>{item.rest_name}</Text>
          <Text style={styles.listAddr}>{item.rest_addr}</Text>
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
          flexDirection: 'row',
        }}
      />
    );
  };

  const pressListHandler = async (item) => {
    console.log(item);
    const {lat, lng} = await getGeocode(item.rest_addr);
    console.log({lat, lng});

    navigation.navigate('Map', {
      latlng: {lat, lng}
    })
  }


  // const showVeganMapList = veganRest.map(
  //   (raw, idx) => {
  //     return (
  //       <View key={idx}>
  //         <TouchableOpacity onPress={() => pressListHandler(raw, idx)}>
  //           <View style={styles.listArea}>
  //             <Text style={styles.listName}>{raw.rest_name}</Text>
  //             <Text style={styles.listAddr}>{raw.rest_addr}</Text>
  //           </View>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   }
  // )
  
  return (
    <SafeAreaView style={{ flex : 1 }}>
      <View style={styles.container}>
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
        <CustomHeader title="Vegan Restaurant List" isHome={true} navigation={navigation} />

        <FlatList
          data={veganRest}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={getItemSeparator}
          renderItem={(item, idx) => getItem(item)}
        />
        
        {/* <ScrollView>{showVeganMapList}</ScrollView> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  listArea: {
    width: '100%',
    paddingHorizontal: 20,
    // height: 80,
    // borderBottomWidth: 0.5,
    // borderColor: '#C8C8C8'
  },
  listName: {
    margin: 10,
    marginLeft: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    color: 'dodgerblue',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR',
  },
  listAddr: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    color: 'black',
    fontSize: 12,
    fontFamily: 'NanumSquareR',
    // textAlign: 'center'
  },
  
})