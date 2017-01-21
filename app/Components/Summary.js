'use strict';

import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 5,
    alignSelf: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  HeaderText: {
    fontSize: 25,
    color: '#111',
    alignSelf: 'center',
    margin: 10
  },
  headerSpace: {
    height: 40,
    backgroundColor: 'white'
  },
});

class Summary extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      error: false,
      summary: this.props.summary
    }
  }

  numberToCurrency(number) {
    const val = number/100.00;
    return String(val).split("").reverse().join("")
      .replace(/(\d{3}\B)/g, "$1,")
      .split("").reverse().join("");
  }

  render() {
    var showErr = (
      this.state.error ? <Text>{this.state.error} </Text> : <View></View>
    );
    var start = this.numberToCurrency(this.props.summary.start_figure);
    var stakes = this.numberToCurrency(this.props.summary.stakes);
    var returns = this.numberToCurrency(this.props.summary.returns);
    var figure = this.numberToCurrency(this.props.summary.holding_figure);
    return (
      <ScrollView>
        <View style={styles.headerSpace}/>
        <Text style={styles.HeaderText}>Daily Summary</Text>
        <Text style={styles.welcome}>Start Figure</Text>
        <Text style={styles.text}>£{start}</Text>
        <Text style={styles.welcome}>Number of Bets</Text>
        <Text style={styles.text}>{this.props.summary.bet_numbers}</Text>
        <Text style={styles.welcome}>Stakes</Text>
        <Text style={styles.text}>£{stakes}</Text>
        <Text style={styles.welcome}>Returns</Text>
        <Text style={styles.text}>£{returns}</Text>
        <Text style={styles.welcome}>Holding Figure</Text>
        <Text style={styles.text}>£{figure}</Text>
      </ScrollView>
    );
  }
}

module.exports = Summary;
