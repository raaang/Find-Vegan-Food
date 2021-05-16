import React, { Component, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class BarcodeScan extends Component {
  constructor(props) {
    super(props);
    this.handleTourch = this.handleTourch.bind(this);
    this.state = {
      torchOn: false
    }
  }
  
  cameraRef = useRef();

  onBarCodeRead = (e) => {
    Alert.alert(
      "Barcode value is" + e.data, "Barcode type is" + e.type
    );
  }

  handleTourch(value) {
    if (value === true) {
      this.setState({ torchOn: false });
    } else {
      this.setState({ torchOn: true });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          torchMode={
            this.state.torchOn ? 
            RNCamera.constants.TorchMode.on : 
            RNCamera.constants.TorchMode.off
          }
          onBarCodeRead={this.onBarCodeRead}
          ref={cameraRef}
          aspect={RNCamera.constants.Aspect.fill}
        >
          <Text style={{
            backgroundColor: 'white'
          }}>BARCODE SCANNER</Text>
        </RNCamera>
        <View style={styles.bottomOverlay}>
          <TouchableOpacity 
            onPress={() => this.handleTourch(this.state.torchOn)}
          >
            <Image style={styles.cameraIcon}
              source={
                this.state.torchOn === true ? 
                require('./images/flasher_on.jpg') : 
                require('./images/flasher_off.jpg')
              } 
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40
  },
  bottomOverlay: {
    position: "absolute",
    width: "100%",
    flex: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
});