/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Navigation } from 'react-navigation';

// Navigation.registerComponent(appName, () => App);

// Navigation.startSingScreenApp({
//   screen: {
//     screen: 'Home',
//     title: 'Welcome',
//     navigatorStyle: {
//       navBarHidden: false,
//     },
//     navigatorButtons: {}
//   }
// });

AppRegistry.registerComponent(appName, () => App);
