import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import Picker from '@gregfrench/react-native-wheel-picker';

export default function VeganInfoScreen({ navigation }) {
  const veganName = ['Vegan', 'Lacto', 'Ovo', 'Lacto-ovo', 'Pasco', 'Pollo'];

  const veganFlag = [[1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0], 
                      [1, 1, 1, 0, 0, 0], [1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 0]];
  
  const backColor = ['lightgreen', 'aliceblue', 'lightyellow', 'palegoldenrod', 'lightblue', 'wheat'];

  const [selectedItem, setSelectedItem] = useState(2);


  const saladImage = (flag) => {
    if (flag)
      return require('../Images/Food/salad_color.png');
    else
      return require('../Images/Food/salad.png');
  }

  const milkImage = (flag) => {
    if (flag)
      return require('../Images/Food/milk_color.png');
    else
      return require('../Images/Food/milk.png');
  }

  const eggImage = (flag) => {
    if (flag)
      return require('../Images/Food/egg_color.png');
    else
      return require('../Images/Food/egg.png');
  }

  const fishImage = (flag) => {
    if (flag)
      return require('../Images/Food/fish2_color.png');
    else
      return require('../Images/Food/fish2.png');
  }

  const chickenImage = (flag) => {
    if (flag)
      return require('../Images/Food/chicken_color.png');
    else
      return require('../Images/Food/chicken.png');
  }

  const meatImage = (flag) => {
    if (flag)
      return require('../Images/Food/meat_color.png');
    else
      return require('../Images/Food/meat.png');
  }

  const pressVeganList = (name) => {
    if (veganName == 'Vegan')
      alert(veganName);
  }

  const pressBtnHandler = () => {
    
      alert('press');
  }

  var i = 0;

  const showVeganList = veganFlag.map(
    (flag, idx) => {
      i++;
      console.log(veganName[i - 1]);
      return (
        <TouchableOpacity key={idx} style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 15,
          paddingLeft: 20,
          backgroundColor: backColor[i - 1]
        }}
        >
          <View style={styles.veganTextArea}>
            <Text style={styles.veganText}>{veganName[i - 1]}</Text>
          </View>

          <View style={styles.veganImageArea}>
            <Image style={styles.veganImage} source={saladImage(flag[0])} resizeMode='contain' />
            <Image style={styles.veganImage} source={milkImage(flag[1])} resizeMode='contain' />
            <Image style={styles.veganImage} source={eggImage(flag[2])} resizeMode='contain' />
            <Image style={styles.veganImage} source={fishImage(flag[3])} resizeMode='contain' />
            <Image style={styles.veganImage} source={chickenImage(flag[4])} resizeMode='contain' />
            <Image style={styles.veganImage} source={meatImage(flag[5])} resizeMode='contain' />
          </View>
        </TouchableOpacity>
      )
    }
  )

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="Vegan Info" isHome={true} navigation={navigation} />
      {/* <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../Images/vegan_info.jpg')}
        />
      </View> */}

      <View style={styles.listArea}>
        <Text style={styles.title}>Click Your Vegan Type</Text>
        {showVeganList}
      </View>

      <TouchableOpacity
        style={styles.btnArea}
        onPress={pressBtnHandler}
      >
        <Text style={styles.btnText}>Choose Your Vegan Type</Text>
      </TouchableOpacity>

      <Picker style={styles.picker}
        lineColor='gray' //to set top and bottom line color (Without gradients)
        lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
        lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
        selectedValue={selectedItem}
        itemStyle={{ color: "black", fontSize: 26 }}
        onValueChange={(index) => setSelectedItem(index)}>
        {veganName.map((value, idx) => (
          <Picker.Item label={value} value={idx} key={idx} />
        ))}
      </Picker>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    // borderWidth: 1,
    // borderColor: 'blue'
  },

  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR',
    marginBottom: 20
  },
  
  picker: {
    width: 200,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, 
    borderColor: 'gray'
  },

  btnArea: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '60%',
    padding: 10,
    marginBottom: '5%',
    borderRadius: 5,
    backgroundColor: 'cornflowerblue'
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR'
  },


  listArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  veganArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 10,
    padding: 15,
    paddingLeft: 20,
    // borderWidth: 1,
    borderColor: 'gray',
    borderBottomWidth: 1,
    // backgroundColor: color
  },

  veganTextArea: {
    width: '30%',
  },
  veganText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'NanumSquareR',
  },

  veganImageArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  veganImage: {
    flex: 1,
    width: 30,
    height: 30,
    padding: 5,
  }
})