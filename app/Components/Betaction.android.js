'use strict';

import React, { Component } from 'react';
import ReactNative, {
  StyleSheet,
  View,
  Alert,
  TouchableHighlight,
  Text,
  SegmentedControlIOS,
  TextInput,
  ActivityIndicatorIOS
} from 'react-native';

var api = require('../Utils/api');

var styles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  eachWaySelect: {
    height: 40,
    padding: 10,
    margin: 20,
    flex: 4,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8
  },
  headerSpace: {
    height: 80,
    backgroundColor: 'white'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    marginBottom: 20,
    marginTop: 10
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginLeft: 20,
    marginRight: 20
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 20
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
  otherAmountInput: {
    height: 40,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
});

class Betaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      request: this.props.request,
      fractionPrice: this.props.fractionPrice,
      ewText: this.props.ewText,
      ewOptions: ['Win', 'Each Way', 'Half Place'],
      otherAmount: '' 
    }
  }

  fullStakesReturned() {
    api.confirmBetRequest(this.state.request, this.props.token, 'placed', {})
    .then(json => this.redirectToBetRequests(json))
    .catch(error =>
        this.setState({
          message: 'Something went wrong' + error
        }));
  }

  spOnly() {
    api.confirmBetRequest(this.state.request, this.props.token, 'sp', {})
    .then(json => this.redirectToBetRequests(json))
    .catch(error =>
        this.setState({
          message: 'Something went wrong' + error
        }));
  }

  priceChanged() {
    api.confirmBetRequest(this.state.request, this.props.token, 'change', {})
    .then(json => this.redirectToBetRequests(json))
    .catch(error =>
        this.setState({
          message: 'Something went wrong' + error
        }));
  }

  partialStakesReturned() {
    var options = {
      amount: this.state.otherAmount,
      eachWay: this.state.ewOptions[this.state.selectedIndex] 
    }
    api.confirmBetRequest(this.state.request, this.props.token, 'partial', options)
    .then(json => this.redirectToBetRequests(json))
    .catch(error =>
        this.setState({
          message: 'Something went wrong' + error
        }));
  }
  
  onOtherAmountChanged(event) {
    this.setState({ otherAmount: event.nativeEvent.text });
  }

  redirectToBetRequests(response) {
    this.props.navigator.pop();
  }

  render() {
    var request = this.state.request;
    var fractionPrice = this.state.fractionPrice;
    var ewText = this.state.ewText;
    return (
      <View>
        <View style={styles.headerSpace}/>
        <Text
          style={styles.text}
          >Android Version        </Text>
        <Text
          style={styles.text}
          >{request.selection.name} {request.selection.event_name} {request.selection.event.meeting.name }
        </Text>
        <View style={styles.separator}/>
        <TouchableHighlight
          style={styles.button}
          onPress={()=>Alert.alert(
            'Confirm Full Stakes Placed',
            'You are confirming that you have placed full requested stakes',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
              {text: 'OK', onPress: this.fullStakesReturned.bind(this)}
            ]
            )}
          underlayColor="white">
          <Text style={styles.buttonText}>Confirm £{request.amount} {ewText} at {fractionPrice} </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={()=>Alert.alert(
            'Confirm that the price has changed',
            'You are confirming that the price has changed',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
              {text: 'OK', onPress: this.priceChanged.bind(this)}
            ]
            )}
          underlayColor="white">
          <Text style={styles.buttonText}>Price Changed</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={()=>Alert.alert(
            'Confirm SP only offered',
            'You are confirming that you were offered SP only on this selection',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
              {text: 'OK', onPress: this.spOnly.bind(this)}
            ]
            )}
          underlayColor="white">
          <Text style={styles.buttonText}>SP Only</Text>
        </TouchableHighlight>
        <View style={styles.separator}/>
        <TextInput
          style={styles.otherAmountInput}
          value={this.state.otherAmount}
          keyboardType="numeric"
          onChange={this.onOtherAmountChanged.bind(this)}
          placeholder='Enter Different Amount'/>
        <SegmentedControlIOS
          style={styles.eachWaySelect}
          values={this.state.ewOptions}
          selectedIndex={this.state.selectedIndex}
          onChange={(event) => {
            this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
          }}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.partialStakesReturned.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}>Confirm Reduced Stakes</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

module.exports = Betaction;
