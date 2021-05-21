// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../Components/CustomHeader';

const Search = ({navigation}) => {
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

  const pressBackHandler = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        {/* <View style={styles.left}>
          <TouchableOpacity style={styles.back} onPress={pressBackHandler}>
            <IonIcon name='chevron-back' size={30} />
          </TouchableOpacity>
        </View> */}
        <CustomHeader title='' isHome={false} isSearch={true} navigation={navigation} />
        <SearchBar
          round
          lightTheme
          containerStyle={{justifyContent: 'center'}}
          // inputStyle={{height: 30}}
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Search Product Name"
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // flexDirection: 'row',
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
});

export default Search;
