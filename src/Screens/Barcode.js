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
import { RNCamera } from 'react-native-camera';

export default function Barcode() {
  const cameraRef = useRef();

  const [qrvalue, setQrvalue] = useState('');
  const [openScanner, setOpenScanner] = useState(false);

  // const onBarcodeScan = (qrvalue) => {
  //   // Called after te successful scanning of QRCode/Barcode
  //   setQrvalue(qrvalue);

  //   //여기서 api로 연결해야하나?
  //   setOpenScanner(false);
  //   alert(qrvalue);
  // };
  
  const onBarCodeRead = (qrvalue) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);

    alert(
      "Barcode type : " + qrvalue.type + "\n" +
      "Barcode value : " + qrvalue.data
    );

    //여기서 api로 연결해야하나?
    setOpenScanner(false);
  }

  const onOpenScanner = () => {
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
            setQrvalue('');
            setOpenScanner(true);
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
      setQrvalue('');
      setOpenScanner(true);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {openScanner ? (
        <View style={styles.barcodeArea}>
          <RNCamera
            ref={cameraRef}
            style={styles.barcode}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.auto}
            onBarCodeRead={
              (event) => onBarCodeRead(event)
            }
            // onGoogleVisionBarcodesDetected={
            //   (event) => onBarcodeScan(event)
            // }
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel'
            }}
          />
          <TouchableOpacity
            style={styles.saveBtnArea}
            onPress={takePicture}
          >
            <Text style={styles.saveBtnText}>Save Barcode Picture</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnArea}
            onPress={onOpenScanner}
          >
            <Text style={styles.btnText}>Barcode Scan</Text>
          </TouchableOpacity>
        </View>
      )}
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
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'NanumSquareR'
  },

  barcodeArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcode: {
    // alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
  saveBtnArea: {
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center'
  },
  saveBtnText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'NanumSquareR',
    // alignSelf: 'center',
  }
});
