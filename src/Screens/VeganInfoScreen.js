import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import { Picker } from '@react-native-picker/picker';

export default function VeganInfoScreen({ navigation }) {
  const veganName = ['Vegan', 'Lacto', 'Ovo', 'Lacto-ovo', 'Pasco', 'Pollo'];

  const veganFlag = [[1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0], 
                      [1, 1, 1, 0, 0, 0], [1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 0]];
  
  const backColor = ['lightgreen', 'aliceblue', 'lightyellow', 'palegoldenrod', 'lightblue', 'wheat'];

  const [selectedItem, setSelectedItem] = useState('');


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

  var i = 0;
  const showVeganList = veganFlag.map(
    (flag, idx) => {
      i++;
      return (
        <View key={idx} style={{
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
        </View>
      )
    }
  )

  console.log(selectedItem);

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="Vegan Info" isHome={true} navigation={navigation} />
      <View style={styles.container}>

        <Text style={styles.title}>Choose Your Vegan Type</Text>
        
        {showVeganList}

        <View style={styles.pickerArea}>
          <Picker
            mode='dialog'
            style={styles.picker}
            onValueChange={(val, idx) => setSelectedItem({ val })}
          >
            {veganName.map((name, idx) => (
              <Picker.Item label={name} value={name} key={idx} />
            ))}
          </Picker>
        </View>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR',
    marginBottom: 20
  },

  pickerArea: {
    justifyContent: 'center',
    width: '55%',
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
  picker: {
    width: 200,
    height: 50,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'NanumSquareR',
    borderWidth: 1,
    borderColor: 'gray'
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