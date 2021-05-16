import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Navigator from './src/Screens/Navigator';

export default function App() {
  return (
      <Navigator />
      
          // {/* <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }}>
          //   <FlatList
          //     data={data}
          //     keyExtractor={(item, index) => index.toString()}
          //     renderItem={({ item }) =>
          //       <View>
          //         <Text>{item.user_name}</Text>
          //       </View>
          //     }
          //   />
          // </View> */}

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})