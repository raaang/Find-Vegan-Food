import React, {useState} from 'react';
import {CSVLink} from 'react-csv';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import CustomHeader from '../Components/CustomHeader';
import veganRestaurant from '../서울시 지정·인증업소 현황.json';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Geocode from 'react-geocode'

Geocode.setApiKey('AIzaSyAkoCeMsSPklTRgyxQQtJjAKWFJDfgzwWc');
Geocode.setLanguage('en');
Geocode.setRegion('es');
Geocode.enableDebug();

export default function VeganRestaurantScreen({navigation}) {
  const [data, setData] = useState([]);

  console.log('----------------------------');
  const restList = veganRestaurant.DATA;
  // console.log(restList[0]);
  const veganRest = [];

  // find vegan restaurant name, address,
  restList.map((rest, idx) => {
    if (rest.crtfc_gbn_nm == '채식음식점') {
      console.log(
        rest.upso_nm,
        rest.food_menu,
        rest.crtfc_gbn_nm,
        rest.rdn_code_nm,
      );

      veganRest.push({
        rest_name: rest.upso_nm,
        rest_menu: rest.food_menu,
        rest_flag: rest.crtfc_gbn_nm,
        rest_addr: rest.rdn_code_nm,
      });
    }
  });

  console.log(veganRest);
  console.log(veganRest.length);
  
  const add = veganRest[0].rest_addr;
  console.log(add);
  Geocode.fromAddress(add)
    .then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    (error) => {
      console.error(error);
    }
  );

  
  const getGeocode = async (currentAddr) => {
    console.log('getGeocode: ', currentAddr);
    return Geocode.fromAddress(currentAddr)
      .then( response => {
        const { lat, lng } = response.results[0].geometry.location;
        return {lat, lng}
      })
      .catch(err => console.log(err))
  }


  return (
    <View style={styles.container}>
      <CustomHeader
        title="Vegan Restaurants"
        isHome={true}
        navigation={navigation}
      />
      {/* <Text>Vegan Restaurants</Text> */}

      <MapView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.566353, // 위도
          longitude: 126.977953, // 경도
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}>
        <Marker
          coordinate={{
            latitude: 37.566353,
            longitude: 126.977953,
          }}
        >
          {/* <TouchableOpacity> */}
          <Image
            style={{height: 30, width: 30}}
            source={require('../Images/Icon/placeholder_yellow.png')}
          />
          {/* <Icon name='map-marker-alt' size={30} /> */}
          {/* </TouchableOpacity> */}
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
