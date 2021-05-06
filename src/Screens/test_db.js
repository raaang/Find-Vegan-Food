import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { Button, Text, View } from 'react-native';

// function App() {
//   useEffect(() => {
//     callApi()
//       .then(res => console.log(res))
//       .catch(err => console.log("this is error " + err));
//   }, [])

//   async function callApi() {
//     console.log('1========================')
//     const response = await fetch('/member')
//     console.log('2========================')
//     console.log(response);
//     const body = await response.json();
//     console.log('3========================')
//     console.log(body);
//     return body;
//   }

//   // render() {
//     return (
//       <View>
//         {/* <Text>{musics}</Text> */}
//         <Button onPress={callApi} title="Press"></Button>
//       </View>
//     )
//   // }
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello : [],
    }
  }

  componentDidMount() {
    this._getHello();
  }

  _getHello = async() => {
    const res = await axios.get('/member');
    this.setState({ hello : res.data.hello })
    console.log(this.state.hello);
  }

  render() {
    return(
      <Text>get DB data(브라우저 개발모드 콘솔확인)</Text>
    )
  }
}

export default App;