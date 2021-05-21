import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function CustomHeader({title, isHome, isSearch, navigation}) {
  const pressBackHandler = () => {
    navigation.goBack();
  }

  const pressMenuHandler = () => {
    navigation.openDrawer();
  }

  const pressSearchHandler = () => {
    navigation.navigate('Search Product');
  }

  
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('http://192.168.25.6:4444/product')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.product_name
          ? item.product_name
          : ''
        const textData = text
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity onPress={() => getItem(item)}>
        <Text style={styles.listName}>{item.product_name}</Text>
        <Text style={styles.listNum}>
          Barcode No.{item.barcode}
          {' / '}
          Product No.{item.product_num}
        </Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
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

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.product_name + ' Title : ' + item.barcode);
  };


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

        <View style={styles.left}>
          {isHome ? (
            <TouchableOpacity style={styles.menu} onPress={pressMenuHandler}>
              <IonIcon name="menu" size={30} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.back} onPress={pressBackHandler}>
              <IonIcon name='chevron-back' size={30} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.middle}>
          <Text style={{ textAlign: 'center' }}>{title}</Text>
        </View>

        <View style={styles.right}>
          {isSearch ? (
            <View>

            </View>
          ) : (
            <TouchableOpacity style={styles.search} onPress={pressSearchHandler}>
              <IonIcon name="search" size={30} color="#000" />
            </TouchableOpacity>

            // <TouchableHighlight
            //   activeOpacity={1}
            //   underlayColor={'#ccd0d5'}
            //   onPress={onFocus}
            //   style={styles.search_icon_box}
            // >
            //   <IonIcon name="search" size={30} />
            // </TouchableHighlight>
          )}
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

          <View style={styles.inputArea}>
            <TextInput
              ref={inputRef}
              placeholder='Search Product'
              clearButtonMode='always'
              value={keyword}
              onChangeText={(value) => searchFilterFunction(value)}
              // onChangeText={(text) => searchFilterFunction(text)}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.clearInputBtn}
              onPress={() => setKeyword('')}
            // onPress={() => searchFilterFunction('')}
            >
              <IonIcon name='close-circle-outline' size={30} />
            </TouchableOpacity>
          </View>

        </Animated.View>
      </View>


      <Animated.View style={[styles.content, { opacity: content_opacity, transform: [{ translateY: content_translate_y }] }]}>
        <SafeAreaView style={styles.content_safe_area}>
          <View style={styles.content_inner}>
            <View style={styles.separator} />
              <View>
                <FlatList
                  data={filteredDataSource}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  renderItem={ItemView}
                >
                </FlatList>
              </View>
          </View>
        </SafeAreaView>
      </Animated.View>
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
    // borderWidth: 1,
    // borderColor: 'blue'
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    // borderWidth: 1,
    // borderColor: 'gray'
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
    flex: 1,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    // borderWidth: 1,
    // borderColor: 'blue'
  },
  clearInputBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 5,
    // borderWidth: 1,
    // borderColor: 'blue'
  },

  
  content: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999,
    // borderWidth: 1,
    // borderColor: 'black'
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: 'blue'
  },
  content_inner: {
    flex: 1,
    paddingTop: 50,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  separator: {
    marginTop: 50,
    height: 1,
    backgroundColor: '#e4e6eb',
    // borderWidth: 1,
    // borderColor: 'black'
  },

  listName: {
    padding: 10,
    paddingLeft: 30,
    justifyContent: 'center',
    fontSize: 17,
    fontFamily: 'NanumSquareR'
  },
  listNum: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    color: 'silver',
    fontSize: 12,
    fontFamily: 'NanumSquareR',
    // textAlign: 'center'
  }
})