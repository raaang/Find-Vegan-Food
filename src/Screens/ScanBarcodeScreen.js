import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default function ScanBarcodeScreen({ navigation }) {
  const cameraRef = useRef();

  const onBarCodeRead = (barcodeValue) => {
    // Called after te successful scanning of QRCode/Barcode
    // setQrvalue(barcodeValue);

    alert(
      'Barcode type : ' + barcodeValue.type + '\n' +
      'Barcode value : ' + barcodeValue.data
    );

    // setTimeout(() => {
      
    // }, 5000);
    // setInterval(() => {
      
    // }, 3000);

    navigation.pop();
    // history.go(-1);
    // history.back();
    // location.href="./BarcodeScreen.js";
    
  }

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  return (
    <View style={styles.container}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  barcodeArea: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  barcode: {
    // alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    height: 200
  },
  saveBtnArea: {
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center'
    width: '60%',
    padding: 10,
    marginBottom: '5%',
    borderRadius: 5,
    backgroundColor: 'lightblue'
  },
  saveBtnText: {
    // alignSelf: 'center',
    color: 'white',
    fontSize: 15,
    fontFamily: 'NanumSquareR'
  }
})