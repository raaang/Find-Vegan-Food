import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import BarcodeScreen from './BarcodeScreen';
import ScanBarcodeScreen from './ScanBarcodeScreen';

const screens = {
  Home: {
    screen: HomeScreen
  },
  Login: {
    screen: LoginScreen
  },
  Barcode: {
    screen: BarcodeScreen
  },
  ScanBarcode: {
    screen: ScanBarcodeScreen
  }
}

const Stack = createStackNavigator(screens);

export default createAppContainer(Stack);