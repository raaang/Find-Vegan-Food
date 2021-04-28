/**
 * @format
 */

 import { AppRegistry } from 'react-native';
 import App from './App';
 import { name as appName } from './app.json';
 
 import { createNavigator } from 'react-navigation'
 import { createStackNavigator } from 'react-navigation-stack';

 import Barcode from './src/Screens/Barcode';
 
 const AppNavigator = createStackNavigator({
   Home: {
     screen: Barcode, 
   },
 });
 
 AppRegistry.registerComponent(appName, () => App);
 