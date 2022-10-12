import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import CustomHeader from '../Components/CustomHeader';
import veganRestaurant from '../서울시 지정·인증업소 현황.json';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API_KEY);
Geocode.setLanguage('ko');
// Geocode.setRegion('es');
Geocode.enableDebug();

export default function VeganMapScreen({ route, navigation }) {
  console.log('==============================');
  const restList = veganRestaurant.DATA;
  var veganRest = [];
  const [geo, setGeo] = useState([]);
  const [latitude, setLatitude] = useState(37.566353);
  const [longitude, setLongitude] = useState(126.977953);

  // var latitude = 37.566353;         // 위도
  // var longitude = 126.977953;       // 경도

  console.log(latitude);
  console.log(longitude);

  useEffect(() => {
    try {
      console.log('----------------------------');
      var { latlng } = route.params;
      console.log(latlng.lat);
      console.log(latlng.lng);

      if (latlng != '') {
        setLatitude(latlng.lat);
        setLongitude(latlng.lng);
      }

    } catch (err) {
      console.log(err);
    }
  }, []);
  
  console.log(latitude);
  console.log(longitude);
  
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
      // console.log(
      //   rest.upso_nm,
      //   rest.food_menu,
      //   rest.crtfc_gbn_nm,
      //   rest.rdn_code_nm + ' ' + rest.rdn_detail_addr
      // );

      if (rest.rdn_detail_addr)
        rest_addr = rest.rdn_code_nm + ' ' + rest.rdn_detail_addr;
      else rest_addr = rest.rdn_code_nm;

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

  const getLatLng = async () => {
    const geoList = [];
    var i;

    for (i = 0; i < veganRest.length; i++) {
      // console.log(i);
      const {lat, lng} = await getGeocode(veganRest[i].rest_addr);
      // console.log({lat, lng});
      geoList.push({lat, lng});
    }
    setGeo(geoList);
  };

  useEffect(() => {
    getLatLng();
  }, []);

  console.log('geoList');
  console.log(geo);
  console.log(geo.length);
  
  const showGeoList = geo.map((g, idx) => {
    return (
      <Marker
        key={idx}
        coordinate={{
          latitude: g.lat,
          longitude: g.lng,
        }}
        title={veganRest[idx].rest_name}
        description={veganRest[idx].rest_addr}
      >
        <Image
          style={{height: 30, width: 30}}
          source={require('../Images/Icon/placeholder_yellow.png')}
        />
      </Marker>
    )
  })

  return (
    <View style={styles.container}>
      <CustomHeader title="Vegan Restaurant Map" isHome={true} navigation={navigation} />

      <MapView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude, // 위도
          longitude: longitude, // 경도
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}>
        {showGeoList}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btnArea: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: '20%',
    height: 10,
    // justifyContent: 'center',
    // width: '60%',
    // padding: 10,
    // marginBottom: '5%',
    borderRadius: 5,
    backgroundColor: 'cornflowerblue',
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR',
  },
});
