import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import BarcodeScreen from './BarcodeScreen';
import ScanBarcodeScreen from './ScanBarcodeScreen';
import ProductScreen from './ProductScreen';
import MaterialScreen from './MaterialScreen';
import SignUpScreen from './SignUpScreen';

const screens = {
  Start: {
    screen: StartScreen
  },
  Login: {
    screen: LoginScreen
  },
  SignUp: {
    screen: SignUpScreen
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