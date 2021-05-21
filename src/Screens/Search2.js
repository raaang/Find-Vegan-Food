import React, { useState, useEffect } from 'react';

import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput } from 'react-native';

export default function Search2() {

  const [isLoading, setIsLoding] = useState(false);
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  var arrayholder = [];

  useEffect(() => {
    fetch('http://192.168.25.6:4444/product')
      .then((response) => response.json())
      .then((responseJson) => {
        setIsLoding(false);
        setData(responseJson);
        arrayholder = responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const GetFlatListItem = (name) => {
    Alert.alert(name);
  }

  const searchData = (text) => {
    const newData = arrayholder.filter(item => {
      const itemData = item.product_name;
      const textData = text;
      return itemData.indexOf(textData) > -1
    });

    setData(newData);
    setText(text);
  }

  const itemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

  // render() {
    if (isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <View style={styles.MainContainer}>

        <TextInput
          style={styles.textInput}
          onChangeText={(text) => searchData(text)}
          value={text}
          underlineColorAndroid='transparent'
          placeholder="Search Here" />

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={itemSeparator}
          renderItem={({ item }) => 
            <Text style={styles.row} onPress={GetFlatListItem.bind(item.product_name)} >
              {item.product_name}
            </Text>
          }
          style={{ marginTop: 10 }} />

      </View>
    );
  // }
}

const styles = StyleSheet.create({

  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,
  },

  row: {
    fontSize: 18,
    padding: 12
  },

  textInput: {
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF"
  }
});