import React, {Component, PropTypes} from "react";
import {Dimensions, Image, InteractionManager, Animated, StyleSheet, ScrollView, ListView, View, Text, RefreshControl, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import Api from '../Api';
import ErrorView from '../components/ErrorView';
import SearchBar from '../components/SearchBar';
import FeedItem from '../components/FeedItem';
import XListView from '../components/XListView';
import config from '../config';

export default class Home extends Component {

  constructor(props) {
    super(props);
  }

  _renderRow(feed) {
    return (
      <FeedItem feed={feed} key={feed.id} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar onPress={()=>Actions.search()} />
        <XListView
          onFetch={{func: Api.getFeeds}}
          renderRow={this._renderRow}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: config.backgroundColor,
  },
  scrollView: {
    flex: 1,
    padding: 5,
  },
  loadMore: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
  },
  loadMoreText: {
    fontSize: 15,
  },
});
