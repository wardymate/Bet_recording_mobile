'use strict';

import React, { Component } from 'react';
import ReactNative, {
  StyleSheet,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

var api = require('../Utils/api');
var BetRequests = require('./BetRequests')

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
  title: {
    fontSize: 25,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 20
  }
});

class Bookmakers extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.bookmakers)
    };
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}
                numberOfLines={1}>{rowData.name}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  rowPressed(bookmaker) {
    api.getBookmakerData(bookmaker.id)
      .then(json => this.displayBetRequests(json, bookmaker))
      .catch(error =>
        this.setState({
          message: 'Something went wrong' + error
        }));
  }

  displayBetRequests(response, bookmaker) {
    this.setState({ isLoading: false , message: '' });
    this.props.navigator.push({
      title: bookmaker.name + ' Bets',
      component: BetRequests,
      passProps: {requests: response}
    });
  }


  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        />
    );
  }

}


module.exports = Bookmakers;
