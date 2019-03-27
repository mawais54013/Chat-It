import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ThemeProvider, Header } from 'react-native-elements';
import PubNubReact from 'pubnub-react';

export default class App extends React.Component {
  render() {
    return (
       <View>
       <Header 
         centerComponent={{ text: 'Welcome To Chat-It!', style: { color: '#fff', fontSize: '30'} }}
       />
        <Text style={styles.headline}>Video/Facetime above </Text>
        <Text style={styles.headline}>Chat and document share at the bottom</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headline: {
    fontSize: 28,
    textAlign: 'center',
    paddingTop: 20,
  },
});