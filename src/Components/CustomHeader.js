import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Image, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcon from 'react-native-vector-icons/Ionicons'
import SearchScreen from '../Screens/SearchScreen';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function CustomHeader({title, isHome, navigation}) {
  const pressBackHandler = () => {
    navigation.goBack();
  }

  const pressMenuHandler = () => {
    navigation.openDrawer();
  }
  
  const [focus, setFocus] = useState(false);
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef();

  const input_box_translate_x = new Animated.Value(width);
  const back_button_opacity = new Animated.Value(0);
  const content_translate_y = new Animated.Value(height);
  const content_opacity = new Animated.Value(0);

  const onFocus = () => {
    // update state
    setFocus(true);

    const input_box_translate_x_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }

    // run animation
    Animated.timing(input_box_translate_x, input_box_translate_x_config).start()
    Animated.timing(back_button_opacity, back_button_opacity_config).start()
    Animated.timing(content_translate_y, content_translate_y_config).start()
    Animated.timing(content_opacity, content_opacity_config).start()
    
    //force force
    // this.refs.inputRef.force();
    inputRef.current.focus();
  }
  
  const onBlur = () => {
    // update state
    setFocus(false);

    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }

    // run animation
    Animated.timing(input_box_translate_x, input_box_translate_x_config).start()
    Animated.timing(back_button_opacity, back_button_opacity_config).start()
    Animated.timing(content_translate_y, content_translate_y_config).start()
    Animated.timing(content_opacity, content_opacity_config).start()

    //force blur
    // this.refs.inputRef.blur();
    inputRef.current.blur()
  }

  return (
    <>
      <View style={styles.container}>
        {/* <SearchScreen /> */}

        {isHome ? (
          <View style={styles.left}>
            <TouchableOpacity style={styles.menu} onPress={pressMenuHandler}>
              <IonIcon name="menu" size={30} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.left}>
            <TouchableOpacity style={styles.back} onPress={pressBackHandler}>
              <IonIcon name='chevron-back' size={30} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.middle}>
          <Text style={{ textAlign: 'center' }}>{title}</Text>
        </View>

        <View style={styles.right}>
          {/* <TouchableOpacity style={styles.search} onPress={pressSearchHandler}>
          <IonIcon name="search" size={30} color="#000" />
        </TouchableOpacity> */}

          <TouchableOpacity
            activeOpacity={1}
            underlayColor={'#ccd0d5'}
            onPress={onFocus}
            style={styles.search}
          >
            <IonIcon name="search" size={30} />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.input_box, { translateX: input_box_translate_x }]}>
          <Animated.View style={{ opacity: back_button_opacity }}>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor={'#ccd0d5'}
              onPress={onBlur}
              style={styles.back_icon_box}
            >
              <IonIcon name='chevron-back' size={30} />
            </TouchableHighlight>
          </Animated.View>

          <TextInput
            ref={inputRef}
            placeholder='Search Product'
            clearButtonMode='always'
            value={keyword}
            onChangeText={(value) => setKeyword(value)}
            style={styles.input}
          />
        </Animated.View>
      </View>


    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    zIndex: 1000,
  },

  left: {
    flex: 1,
    justifyContent: 'center',
  },
  back: { 
    width: 35, 
    height: 35, 
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  menu: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },

  middle: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  search: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },




  search_icon_box: {
    width: 35,
    height: 35,
    // borderRadius: 40,
    // backgroundColor: '#e4e6eb',
    marginHorizontal: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    width: '100%',
    // width: width - 32,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'blue'
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray'
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'blue'
  },

})