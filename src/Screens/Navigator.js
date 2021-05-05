import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import BarcodeScreen from './BarcodeScreen';
import ScanBarcodeScreen from './ScanBarcodeScreen';
import ProductScreen from './ProductScreen';
import MaterialScreen from './MaterialScreen';

const screens = {
  Start: {
    screen: StartScreen
  },
  Login: {
    screen: LoginScreen
  },
  Barcode: {
    screen: BarcodeScreen
  },
  ScanBarcode: {
    screen: ScanBarcodeScreen
  },
  Product: {
    screen: ProductScreen
  },
  Material: {
    screen: MaterialScreen
  }
}

const Stack = createStackNavigator(screens);

export default createAppContainer(Stack);