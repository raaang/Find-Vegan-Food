import React, { Component, useRef, useState } from 'react';
import { 
  StyleSheet,  
  Button, 
  View,
  Text, 
  SafeAreaView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default function btn_full() {
  const cameraRef = useRef();

  const [qrvalue, setQrvalue] = useState('');
  const [openScanner, setOpenScanner] = useState(false);

  const onBarcodeScan = (qrvalue) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);

    //여기서 api로 연결해야하나?
    setOpenScanner(false);
    alert(qrvalue);
  };

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
            alert('CAMERA permission accepted');
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

  return (
    <SafeAreaView style={styles.container}>
      {openScanner ? (
        <View style={{ flex: 1 }}>
          <RNCamera
            style={styles.camera}
            ref={cameraRef}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onBarCodeRead={(event)=>onBarcodeScan(event.nativeEvent.codeStringValue)}
          ></RNCamera>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnArea}
            onPress={onOpenScanner}
          >
            <Text style={styles.btnText}>바코드 스캔하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // height
    alignItems: 'center'      // width
  },
  btnArea: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue'
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'NanumSquareR'
  },
  barcode: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200
  }
});
