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
  listView: {
    marginTop: 20
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
    padding: 10
  }
});

class Transfers extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.transfers)
    };
  }

  renderRow(rowData, sectionID, rowID) {
    var poundsAmount = (rowData.amount)/100;
    var date = new Date(rowData.created_at);
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.selection}>{rowData.description} £{poundsAmount}</Text>
              <Text style={styles.bet}>{rowData.transfer_type_description} {date.toDateString()}</Text>
              <Text style={styles.bet}>Balance: £{rowData.running_total}</Text>
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

module.exports = Transfers;
