'use strict';

import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
  TouchableHighlight
} from 'react-native';

var api = require('../Utils/api');
var Bookmakers = require('./Bookmakers')

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      error: false
    }
  }

  loadBookmakers() {
    this.setState({ isLoading: true });
    var url = "http://localhost:3000/api/v1/bookmakers";
    api.getBookmakers()
      .then(json => this.displayBookmakers(json))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something went wrong' + error
        }));
  }

  displayBookmakers(response) {
    this.setState({ isLoading: false , message: '' });
    this.props.navigator.push({
      title: 'Bookmakers',
      component: Bookmakers,
      passProps: {bookmakers: response}
    });
  }

  render() {
    return (
      <View>
        <Text
          style={styles.text}
          >Welcome to the punting App
        </Text>
        <TouchableHighlight
        style={styles.button}
        onPress={this.loadBookmakers.bind(this)}
        underlayColor="white">
        <Text style={styles.buttonText}> Bookmakers </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
});

module.exports = Main;
