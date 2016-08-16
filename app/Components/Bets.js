'use strict';

import React, { Component } from 'react';
import ReactNative, {
  StyleSheet,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  listView: {
    marginTop: 20
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

class Bets extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.bets)
    };
  }

  fetchPrice(price) {
    var keys = {
      "1.3": "3/10", "1.3333333": "1/3", "1.3636364": "4/11",
      "1.4": "2/5", "1.4444444": "4/9", "1.5": "1/2",
      "1.5333333": "8/15", "1.571429": "4/7", "1.615": "8/13",
      "1.666667": "4/6", "1.727273": "8/11", "1.8": "4/5",
      "1.8333333": "5/6", "1.909091": "10/11", "2": "Evs",
      "2.1": "11/10", "2.2": "6/5", "2.25": "5/4",
      "2.375": "11/8", "2.5": "6/4","2.625": "13/8",
      "2.75": "7/4", "2.875": "15/8", "3": "2/1",
      "3.25": "9/4", "3.5": "5/2", "3.75": "11/4",
      "4": "3/1", "4.333": "10/3", "4.5": "7/2",
      "5": "4/1", "5.5": "9/2", "6": "5/1",
      "6.5": "11/2", "7": "6/1", "7.5": "13/2",
      "8": "7/1", "8.5": "15/2", "9": "8/1",
      "9.5": "17/2", "10": "9/1", "11": "10/1",
      "12": "11/1", "13": "12/1", "15": "14/1",
      "17": "16/1", "19": "18/1", "21": "20/1",
      "26": "25/1", "34": "33/1", "41": "40/1",
      "51": "50/1", "66": "66/1"
    };
    return keys[price];
  }

  eachWayText(eachWay) {
   if (eachWay === true) {
     return "Each Way";
   } else {
     return "Win only";
   }
  }

  renderRow(rowData, sectionID, rowID) {
    var poundsAmount = (rowData.amount)/100;
    var fractionPrice = this.fetchPrice(rowData.price);
    var ewText = this.eachWayText(rowData.each_way);
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.selection}>{rowData.selection.name} {rowData.selection.event_name} {rowData.selection.event.meeting.name }</Text>
              <Text style={styles.bet}
                numberOfLines={1}>£{poundsAmount} {ewText} at {fractionPrice}</Text>
              <Text style={styles.bet}
                numberOfLines={1}>{rowData.comment}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  rowPressed(bet) {
    // this.props.navigator.push({
    //   title: betRequest.selection.name + ' response',
    //   component: Bet,
    //   passProps: {
    //     request: bet,
    //     fractionPrice: this.fetchPrice(betRequest.price),
    //     token: this.props.token
    //   }
    // });
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

module.exports = Bets;
