import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../Components/CustomHeader';

export default function VeganInfoScreen({ navigation }) {
  const veganName = ['Vegan', 'Lacto', 'Ovo', 'Lacto-ovo', 'Pasco', 'Pollo'];

  const veganFlag = [[1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0], 
                      [1, 1, 1, 0, 0, 0], [1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 0]];
  
  const backColor = ['lightgreen', 'aliceblue', 'lightyellow', 'palegoldenrod', 'lightblue', 'wheat'];

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

  var i = -1;

  const showVeganList = veganFlag.map(
    (flag, idx) => {
      i++;
      console.log(veganName[i]);
      return (
        <TouchableOpacity key={idx} style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 15,
            paddingLeft: 20,
            backgroundColor: backColor[i]
          }}
          onPress={pressVeganList(veganName[i])}
        >
          <View style={styles.veganTextArea}>
            <Text style={styles.veganText}>{veganName[i]}</Text>
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
      <Text style={styles.text}>Click Your Vegan Type</Text>
        {showVeganList}
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
  image: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    // borderWidth: 1,
    // borderColor: 'blue'
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
  },

  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareR',
    marginBottom: 20
  }
})