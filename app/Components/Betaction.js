'use strict';

import React, { Component } from 'react';
import ReactNative, {
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

var api = require('../Utils/api');

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 20
  }
});

class Betaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
    console.log(this.props.request);
  }

  buttonPressed() {
  
  }

  render() {
    return (
      <View>
        <Text
          style={styles.text}
          >Action Bet
        </Text>
        <TouchableHighlight
        style={styles.button}
        onPress={this.buttonPressed.bind(this)}
        underlayColor="white">
        <Text style={styles.buttonText}> Press Me </Text>
        </TouchableHighlight>
      </View>
    );
  }

}

module.exports = Betaction;
