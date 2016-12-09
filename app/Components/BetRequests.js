'use strict';

import React, { Component } from 'react';
import ReactNative, {
  StyleSheet,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Foundation';

var Betaction = require('./Betaction');
var priceKeys = require('../Utils/priceKeys');

var styles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  listView: {
    marginTop: 30
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  selection: {
    fontSize: 25,
    color: '#007AFF'
  },
  bet: {
    fontSize: 25,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 20
  }
});

class BetRequests extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.requests)
    };
  }

  fetchPrice(price) {
    return priceKeys[price];
  }

  eachWayText(eachWay) {
   if (eachWay === true) {
     return "Each Way";
   } else {
     return "Win only";
   }
  }

  betAlreadyPlaced(rowData) {
    var userId = this.props.userId;
    var selectionBets = rowData.selection.bets.filter(function(bet) { return bet.user_id === userId});
    var priceBets = selectionBets.filter(function(bet) {return bet.price >= rowData.price});
    if(priceBets.length > 0) {
      return <Icon name="ticket" size={25} color="#4cd964" />
    } else {
    <View></View>
    }
  }


  renderRow(rowData, sectionID, rowID) {
    var fractionPrice = this.fetchPrice(rowData.price);
    var ewText = this.eachWayText(rowData.each_way);
    var showBetIcon = this.betAlreadyPlaced(rowData);
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.selection}>{rowData.selection.name} {rowData.selection.event_name} {rowData.selection.event.meeting.name }</Text>
              <Text style={styles.bet}
                numberOfLines={1}>£{rowData.amount} {ewText} at {fractionPrice} {showBetIcon}</Text>
              <Text style={styles.bet}
                numberOfLines={1}>{rowData.comment}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  rowPressed(betRequest) {
    this.props.navigator.push({
      title: betRequest.selection.name + ' response',
      component: Betaction,
      passProps: {
        request: betRequest,
        fractionPrice: this.fetchPrice(betRequest.price),
        ewText: this.eachWayText(betRequest.each_way),
        token: this.props.token
      }
    });
  }

  render() {
    return (
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        />
      );
  }

}

module.exports = BetRequests;
