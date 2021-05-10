import React, { useState } from 'react';
import { 
  FlatList, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  useColorScheme, 
  View 
} from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';

export default function MaterialScreen({ navigation }) {
  const foodNum = navigation.getParam('foodNum');
  const foodName = navigation.getParam('foodName');
  const materialList = navigation.getParam('materialList');

  console.log('------------------------------');
  console.log('Material Screen');
  console.log(foodNum, foodName);
  console.log(materialList);

  // select query by server
  const postData = async () => {
    console.log('postdata');
    const response = await fetch('http://192.168.25.6:4444/check_vegan/find', {
      method: 'post',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        rawmatList : materialList
      })
    }).then((res) => res.json());
    console.log(response);
  }
  
  postData();

  const [vegan, setVegan] = useState(false);

  // select query by server
  const getData = async () => {
    const response = await fetch('http://192.168.25.6:4444/check_vegan');
    const responseJson = await response.json();
    // setData(responseJson);
    console.log(responseJson);
    
    // var i;
    // for (i=0; i<responseJson.length; i++) {
    //   if (responseJson[i].rawmat_name == materialList[i]);
    // }
  }

  // getData();

  const showMaterialList = materialList.map(
    (mat, idx) => {
      return (
        <View key={idx}>
          <TouchableOpacity style={styles.materialArea}>
            <Text style={styles.materialText}>{mat}</Text>
            <View style={styles.veganArea}>
              <Text style={styles.veganText}>Vegan</Text>
            </View>
          </TouchableOpacity>
          {/* <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }}>
            <FlatList
              data={vegan}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View>
                  <Text>{item.user_name}</Text>
                </View>
              }
            />
          </View> */}
        </View>
      )
    }
  )
  
  // status bar
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={styles.container}>
    {/* <Header /> */}
      <StatusBar barStyle={
        isDarkMode ? 'light-content' : 'dark-content'
        } 
      />
      
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 10,
    padding: 15,
    paddingLeft: 20,
    // borderWidth: 1,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  materialText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'NanumSquareR'
  },

  veganArea: {
    alignItems: 'center',
    // justifyContent: 'center',
    width: '30%',
    padding: 5,
    borderRadius: 25,
    backgroundColor: 'green'
  },
  nonVeganArea: {
    alignItems: 'center',
    // justifyContent: 'center',
    width: '30%',
    padding: 5,
    borderRadius: 25,
    backgroundColor: 'firebrick'
  },
  veganText: {
    alignItems: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR'
  },

})