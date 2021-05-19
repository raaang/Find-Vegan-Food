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
import SearchScreen from './SearchScreen';
import VeganInfoScreen from './VeganInfoScreen';

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'cornflowerblue'}}>
      <ScrollView>
        
      </ScrollView>
    </SafeAreaView>
  )
}

const navOptionHandler = () => ({
  headerShown: false
})

const StackSearch = createStackNavigator();

function SearchStack() {
  return (
    <StackSearch.Navigator>
      <StackSearch.Screen name="Search" component={SearchScreen} options={navOptionHandler} />
    </StackSearch.Navigator>
  )
}

const StackStart = createStackNavigator();

function StartStack() {
  return (
    <StackStart.Navigator initialRouteName="Start">
      <StackStart.Screen name="Start" component={StartScreen} options={navOptionHandler} />
      <StackStart.Screen name="Login" component={LoginScreen} options={navOptionHandler} />
      <StackStart.Screen name="SignUp" component={SignUpScreen} options={navOptionHandler} />
    </StackStart.Navigator>
  )
}

const StackBarcode = createStackNavigator();

function BarcodeStack() {
  return (
    <StackBarcode.Navigator initialRouteName="Start">
      <StackBarcode.Screen name="Barcode" component={BarcodeScreen} options={navOptionHandler}/>
      <StackBarcode.Screen name="Product" component={ProductScreen} options={navOptionHandler}/>
      <StackBarcode.Screen name="Material" component={MaterialScreen} options={navOptionHandler}/>
    </StackBarcode.Navigator>
  )
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Vegan Info') {
            iconName = focused
              ? require('../Images/Icon/vegan_blue.png')
              : require('../Images/Icon/vegan.png');
          } else if (route.name === 'Barcode') {
            iconName = focused
              ? require('../Images/Icon/barcode_blue.png')
              : require('../Images/Icon/barcode.png');
          } else {
            iconName = focused
              ? require('../Images/Icon/paper-clip_blue.png')
              : require('../Images/Icon/paper-clip.png');
          }

          return <Image source={iconName} style={{ width: 25, height: 25 }} resizeMode='contain' />;
        },
      })}
      swipeEnabled={true}
      tabBarOptions={{
        activeTintColor: 'dodgerblue',
        inactiveTintColor: 'gray',
        showIcon: 'true',
        activeBackgroundColor: 'aliceblue',
        indicatorStyle: {
          backgroundColor: 'black',
        },
      }}
    >
      <Tab.Screen name='Vegan Info' component={VeganInfoScreen} />
      <Tab.Screen name='Barcode' component={BarcodeStack} />
      <Tab.Screen name='Save' component={StartStack} />
    </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MenuTab">
        {/* drawerContent={props => CustomDrawerContent(props)}> */}
        <Drawer.Screen name='MenuTab' component={TabNavigator} />
        <Drawer.Screen name='Vegan Information' component={VeganInfoScreen} />
        <Drawer.Screen name='Barcode' component={BarcodeStack} />
        <Drawer.Screen name='Save Product' component={StartStack} />
        <Drawer.Screen name='Search Product' component={SearchStack} />
      </Drawer.Navigator>
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