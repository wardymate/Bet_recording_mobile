'use strict';

import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View,
  ActivityIndicatorIOS,
  TouchableHighlight
} from 'react-native';

var api = require('../Utils/api');
var Main = require('../Components/Main');

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    padding: 5,
    paddingLeft: 20,
    marginLeft: 20,
    marginRight: 20,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: 'black'
  },
  button: {
    height: 80,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#007AFF',
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 25,
    color: '#111',
    alignSelf: 'center'
  },
  headerSpace: {
    height: 80,
    backgroundColor: 'white'
  },
  smallSpace: {
    height: 20,
    backgroundColor: 'white'
  },
});

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      error: false
    }
  }

  onEmailAddressChanged(event) {
    this.setState({ emailAddress: event.nativeEvent.text });
  }

  onPasswordChanged(event) {
    this.setState({ password: event.nativeEvent.text });
  }

  requestLogin() {
    this.setState({ isLoading: true });
    api.requestLogin(this.state.emailAddress, this.state.password)
      .then(json => this.actionLogin(json))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something went wrong. ' + error.message
        }));
  }

  actionLogin(response) {
    if (response.auth_token === undefined ) {
      this.setState({
        isLoading: false,
        message: response.error
      });
    } else {
      this.setState({ isLoading: false });
      this.props.navigator.push({
        title: 'Menu',
        component: Main,
        passProps: {token: response.token}
    });
    }
  }

  render() {
    var showErr = (
      this.state.message ? <Text style={styles.buttonText}>{this.state.message}</Text> : <View></View>
    );
    return (
      <View>
        <View style={styles.headerSpace}/>
        <View style={styles.headerSpace}/>
        <View style={styles.headerSpace}/>
        <TextInput
          style={styles.textInput}
          value={this.state.emailAddress}
          onChange={this.onEmailAddressChanged.bind(this)}
          placeholder='Email address'/>
        <View style={styles.smallSpace}/>
        <TextInput
          style={styles.textInput}
          value={this.state.password}
          onChange={this.onPasswordChanged.bind(this)}
          placeholder='Password'/>
        <View style={styles.headerSpace}/>
        <TouchableHighlight
        style={styles.button}
        onPress={this.requestLogin.bind(this)}
        underlayColor="white">
        <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111"
          size="large"></ActivityIndicatorIOS>
        {showErr}
      </View>
    );
  }
}

module.exports = SignIn;
