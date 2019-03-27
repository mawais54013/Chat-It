import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ThemeProvider, Header } from 'react-native-elements';
import PubNubReact from 'pubnub-react';

// export default class App extends React.Component {
//   render() {
//     return (
//        <View>
//        <Header 
//          centerComponent={{ text: 'Welcome To Chat-It!', style: { color: '#fff', fontSize: '30'} }}
//        />
//         <Text style={styles.headline}>App to make video and chat </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 30,
//     marginBottom: 30,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   headline: {
//     fontSize: 28,
//     textAlign: 'center',
//     paddingTop: 20,
//   },
// });

export default class extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
        publishKey: 'pub-c-fb2af82e-b66a-482a-a551-d6b4e5855921',
        subscribeKey: 'sub-c-213192ec-5043-11e9-913f-e6c25ba7076d'
    });
    this.pubnub.init(this);
  }

  componentWillMount() {
    this.pubnub.subscribe({
      channels: ['channel1'],
      withPresence: true
    });

    this.pubnub.getMessage('channel1', (msg) => {
      console.log(msg);
    });
    
    this.pubnub.getStatus((st) => {
      this.pubnub.publish({
        message: 'hello world from react',
        channel: 'channel1'
      });
    });
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: ['channel1']
    });
  }

  render() {
    const messages = this.pubnub.getMessage('channel1');
    return (
      // <View>
      //     {messages.map((m, index) => <Text key={'message' + index}>{m.message}</Text>)}
          <View>
            <Header 
            centerComponent={{ text: 'Chat-It!', style: { color: '#fff', fontSize: '30'} }}
          />
            <Text>App to make video and chat </Text>
          </View>
    );
  }
}