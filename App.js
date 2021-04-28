import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Barcode } from './src/Screens/Barcode'
// import { NavigatorContainer } from 'react-navigation-native';
// import { createStackNavigator } from 'react-navigation-stack';

// const Stack = createStackNavigator();

export default function App() {
  return(
    <View style={styles.container}>
      <Text>Main Screen</Text>
    </View>
  )
}

// export default function App() {
//   return (
//     <NavigatorContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ title: 'Welcome' }}
//         />
//         <Stck.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigatorContainer>
//   )
// }

// const HomeScreen = ({ navigation }) => {
//   return (
//     <Button
//       title="Go to Jane's profile"
//       onPress={() =>
//         navigation.navigate('Profile', { name: 'Jane' })
//       }
//     />
//   )
// }
// const ProfileScreen = ({ navigation, route }) => {
//   return <Text>This is {route.params.name}'s profile</Text>;
// };

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


