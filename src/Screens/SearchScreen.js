import React, { useRef, useState } from 'react';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode';
import { Animated, Dimensions, Easing, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function SearchScreen({ navigation }) {
  // const pressBackHandler = () => {
  //   navigation.goBack();
  // }

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
      {/* <SafeAreaView style={styles.header_safe_area}> */}
        <View style={styles.header}>
          <View style={styles.header_inner}>
            
            <View>
              <Image
                source={require('../Images/Icon/barcode.png')}
                style={{ width: 150, height: 40, resizeMode: 'contain' }}
              />
            </View>

            <TouchableHighlight
              activeOpacity={1}
              underlayColor={'#ccd0d5'}
              onPress={onFocus}
              style={styles.search_icon_box}
            >
              <IonIcon name="search" size={30} />
            </TouchableHighlight>

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

              <View style={styles.inputArea}>
              <TextInput
                ref={inputRef}
                placeholder='Search Product'
                clearButtonMode='always'
                value={keyword}
                onChangeText={(value) => setKeyword(value)}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.clearInputBtn}
                onPress={() => setKeyword('')}>
                <IonIcon name='close-circle-outline' size={30} />
              </TouchableOpacity>
              </View>
            </Animated.View>

          </View>
        </View>
      {/* </SafeAreaView> */}

      <Animated.View style={[styles.content, { opacity: content_opacity, transform: [{ translateY: content_translate_y }] }]}>
        <SafeAreaView style={styles.content_safe_area}>
          <View style={styles.content_inner}>
            <View style={styles.separator} />
            { keyword === '' 
              ? (
                <View style={styles.image_placeholder_container}>
                  <Text style={styles.image_placeholder_text}>
                    Enter a few words{'\n'}
                    to a search on Barcode
                  </Text>
                </View>
              ) : (
                <ScrollView>
                  <View style={styles.search_item}>
                    <IonIcon style={styles.item_icon} name="search" size={16} color="#ccc" />
                    <Text>Fake result 1</Text>
                  </View>
                  <View style={styles.search_item}>
                    <IonIcon style={styles.item_icon} name="search" size={16} color="#ccc" />
                    <Text>Fake result 2</Text>
                  </View>
                  <View style={styles.search_item}>
                    <IonIcon style={styles.item_icon} name="search" size={16} color="#ccc" />
                    <Text>Fake result 3</Text>
                  </View>
                  <View style={styles.search_item}>
                    <IonIcon style={styles.item_icon} name="search" size={16} color="#ccc" />
                    <Text>Fake result 4</Text>
                  </View>
                </ScrollView>
              )}
          </View>
        </SafeAreaView>
      </Animated.View>

    </>
  )
}

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
    borderWidth: 1,
    borderColor: 'black'
  },
  header: {
    zIndex: 1000,
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'gray'
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'green'
  },
  search_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray'
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
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
  inputArea: {
    flex: 1,
    height: 40,
    borderRadius: 16,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'blue'
  },
  clearInputBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'blue'
  },


  content: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999,
    borderWidth: 1,
    borderColor: 'black'
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue'
  },
  content_inner: {
    flex: 1,
    paddingTop: 50,
    borderWidth: 1,
    borderColor: 'red'
  },
  separator: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#e4e6eb',
    borderWidth: 1,
    borderColor: 'black'
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-50%',
    borderWidth: 1,
    borderColor: 'violet'
  },
  image_placeholder: {
    width: '90%',
    height: '50%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'green',
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'red'
  },
  search_item: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e4eb',
    marginLeft: 16
  },
  item_icon: {
    marginRight: 15
  },






  container: {
    flexDirection: 'row',
    height: 50,
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
})