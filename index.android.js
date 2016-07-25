/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  TouchableHighlight,
  View
} from 'react-native';

var SignIn = require('./app/Components/SignIn');

class PuntingApp extends Component {

  renderScene(route, navigator) {
    return <route.component {...route.passProps} navigator={navigator} />
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ title: 'Log in', component: SignIn }}
        renderScene={ this.renderScene }
        navigationBar={
          <Navigator.NavigationBar 
        style={ styles.nav } 
        routeMapper={NavigationBarRouteMapper} />} 
    />
    );
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
          <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Text style={ styles.leftNavButtonText }>Back</Text>
          </TouchableHighlight>
          )} 
    else { return null }
  },
  RightButton(route, navigator, index, navState) {
    if (route.onPress) return ( <TouchableHighlight
        onPress={ () => route.onPress() }>
        <Text style={ styles.rightNavButtonText }>
        { route.rightText || 'Right Button' }
        </Text>
        </TouchableHighlight> )
  },
  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }></Text>
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  leftNavButtonText: {
    fontSize: 18,
    marginLeft:13,
    marginTop:2
    },
  rightNavButtonText: {
    fontSize: 18,
    marginRight:13,
    marginTop:2
  },
  nav: {
    height: 30,
    backgroundColor: '#efefef'
  },
  title: {
    marginTop:4,
    fontSize:16
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
});

AppRegistry.registerComponent('PuntingApp', () => PuntingApp);
