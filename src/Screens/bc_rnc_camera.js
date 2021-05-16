import React, { Component, useRef, useState } from 'react';
import { StyleSheet, Alert, Button, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

function App() {
  const cameraRef = useRef();

  const constructor = (props) => {
    //super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      }
    };
  }

  const onBarCodeRead = (scanResult) => {
    Alert.alert(
      "Barcode value is " + scanResult.data,
      "Barcode type is " + scanResult.type
    );
    // if (scanResult.data != null) {
    //   if (!this.barcodeCodes.includes(scanResult.data)) {
    //     this.barcodeCodes.push(scanResult.data);
    //     //console.warn('onBarCodeRead call');
    //   }
    // }
    return;
  }

  async function takePicture() {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  const pendingView = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        // flashMode={RNCamera.Constants.FlashMode.auto}
        onBarCodeRead={onBarCodeRead.bind(this)}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera'
        }}
      />
      <View style={[styles.overlay, styles.topOverlay]}>
        <Text style={styles.scanScreenMessage}>
          Please scan the barcode.
        </Text>
      </View>
      <View style={[styles.overlay, styles.bottomOverlay]}>
        <Button
          onPress={() => { console.log('scan clicked'); }}
          style={styles.enterBarcodeManualButton}
          title="Enter Barcode"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;