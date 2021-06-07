import React from 'react';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import BarcodeScreen from './BarcodeScreen';
import ProductScreen from './ProductScreen';
import MaterialScreen from './MaterialScreen';
import SignUpScreen from './SignUpScreen';
import VeganInfoScreen from './VeganInfoScreen';
import SearchScreen from './SearchScreen';
import Search2 from './Search2';
import Search from './Search';
import SaveScreen from './SaveScreen';
import VeganMapScreen from './VeganMapScreen';
import VeganMapListScreen from './VeganMapListScreen';
import HowToUseScreen from './HowToUseScreen';

const navOptionHandler = () => ({
  headerShown: false
})

const StackSearch = createStackNavigator();

function SearchStack() {
  return (
    <StackSearch.Navigator>
      <StackSearch.Screen name='Search' component={SearchScreen} options={navOptionHandler} />
      <StackSearch.Screen name='Material' component={MaterialScreen} options={navOptionHandler} />
    </StackSearch.Navigator>
  )
}

const StackStart = createStackNavigator();

function StartStack() {
  return (
    <StackStart.Navigator initialRouteName="Start">
      <StackStart.Screen name='Start' component={StartScreen} options={navOptionHandler} />
      <StackStart.Screen name='Login' component={LoginScreen} options={navOptionHandler} />
      <StackStart.Screen name='SignUp' component={SignUpScreen} options={navOptionHandler} />
      <StackStart.Screen name='Search' component={SearchScreen} options={navOptionHandler} />
    </StackStart.Navigator>
  )
}

const StackBarcode = createStackNavigator();

function BarcodeStack() {
  return (
    <StackBarcode.Navigator initialRouteName="Start">
      <StackBarcode.Screen name='Barcode' component={BarcodeScreen} options={navOptionHandler}/>
      <StackBarcode.Screen name='Product' component={ProductScreen} options={navOptionHandler}/>
      <StackBarcode.Screen name='Material' component={MaterialScreen} options={navOptionHandler}/>
    </StackBarcode.Navigator>
  )
}

const StackSave = createStackNavigator();

function SaveStack() {
  return (
    <StackSave.Navigator initialRouteName='Save'>
      <StackSave.Screen name='Save' component={SaveScreen} options={navOptionHandler} />
      <StackSave.Screen name='Material' component={MaterialScreen} options={navOptionHandler} />
    </StackSave.Navigator>
  )
}

const TabMain = createBottomTabNavigator();

function MainTab() {
  return (
    <TabMain.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Vegan Info') {
            iconName = focused
              ? require('../Images/Icon/vegan_blue.png')
              : require('../Images/Icon/vegan.png')
          } else if (route.name === 'Barcode') {
            iconName = focused
              ? require('../Images/Icon/barcode_blue.png')
              : require('../Images/Icon/barcode.png')
          } else {
            iconName = focused
              ? require('../Images/Icon/paper-clip_blue.png')
              : require('../Images/Icon/paper-clip.png')
          }

          return (
            <Image
              source={iconName}
              style={{width: 25, height: 25}}
              resizeMode="contain"
            />
          );
        },
      })}
      swipeEnabled={true}
      tabBarOptions={{
        activeTintColor: 'mediumblue',
        inactiveTintColor: 'gray',
        showIcon: 'true',
        activeBackgroundColor: 'aliceblue',
        indicatorStyle: {
          backgroundColor: 'black',
        },
      }}
    >
      <TabMain.Screen name='Vegan Info' component={VeganInfoScreen} />
      <TabMain.Screen name='Barcode' component={BarcodeStack} />
      <TabMain.Screen name='Save' component={SaveStack} />
    </TabMain.Navigator>
  )
}

const TabMap = createBottomTabNavigator();

function MapTab() {
  return (
    <TabMap.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Map') {
            iconName = focused
              ? require('../Images/Icon/map_color.png')
              : require('../Images/Icon/map.png');
          } else {
            iconName = focused
              ? require('../Images/Icon/restaurant_blue.png')
              : require('../Images/Icon/restaurant.png');
          }

          return (
            <Image
              source={iconName}
              style={{width: 25, height: 25}}
              resizeMode="contain"
            />
          );
        },
      })}
      swipeEnabled={true}
      tabBarOptions={{
        activeTintColor: 'mediumblue',
        inactiveTintColor: 'gray',
        showIcon: 'true',
        activeBackgroundColor: 'aliceblue',
        indicatorStyle: {
          backgroundColor: 'black',
        },
      }}
     >
      <TabMap.Screen name="Map" component={VeganMapScreen} />
      <TabMap.Screen name="Map List" component={VeganMapListScreen} />
    </TabMap.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        itemStyle: { marginVertical: 5, paddingVertical: 5, paddingLeft: 4 }
      }}
      screenOptions={({route}) => ({
        drawerIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home Page') {
            iconName = focused
              ? require('../Images/Icon/eco_house_color.png')
              : require('../Images/Icon/eco_house_color.png')
          }
          else if (route.name === 'How To Use') {
            iconName = focused
              ? require('../Images/Icon/manual_color.png')
              : require('../Images/Icon/manual_color.png')
          }
          else if (route.name === 'Vegan Restaurant Map') {
            iconName = focused
              ? require('../Images/Icon/map_color.png')
              : require('../Images/Icon/map_color.png')
          } else {
            iconName = focused
              ? require('../Images/Icon/loupe_color.png')
              : require('../Images/Icon/loupe_color.png');
          }

          return (
            <Image
              source={iconName}
              style={{width: 32, height: 32}}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      {/* drawerContent={props => CustomDrawerContent(props)}> */}
      <Drawer.Screen name='Home Page' component={MainTab} />
      {/* <Drawer.Screen name='Login' component={StartStack} /> */}
      {/* <Drawer.Screen name='Vegan Information' component={VeganInfoScreen} /> */}
      <Drawer.Screen name='Search Product' component={SearchStack} />
      <Drawer.Screen name='Vegan Restaurant Map' component={MapTab} />
      {/* <Drawer.Screen name='How To Use' component={HowToUseScreen} />/ */}
    </Drawer.Navigator>
  ) 
}


export default function Navigator() {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})