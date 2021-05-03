import React, { useRef, useState } from 'react';
import { 
  StyleSheet, 
  View,
  Text, 
  SafeAreaView,
  TouchableOpacity, 
  Platform,
  PermissionsAndroid
} from 'react-native';

export default function BarcodeScreen({ navigation }) {
  const [barcodeValue, setBarcodeValue] = useState('');
  const [openScanner, setOpenScanner] = useState(false);

  const pressOpenScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setBarcodeValue('');
            setOpenScanner(true);

            navigation.push('ScanBarcode');
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setBarcodeValue('');
      setOpenScanner(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnArea}
            onPress={pressOpenScanner}
          >
            <Text style={styles.btnText}>Barcode Scan</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',     // width
    justifyContent: 'center'  // height
  },
  btnArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    padding: 10,
    marginBottom: '5%',
    borderRadius: 5,
    backgroundColor: 'lightblue'
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'NanumSquareR'
  }
});
