import React, {Component, PropTypes} from "react";
import {Platform, Dimensions, Image, InteractionManager, Animated, StyleSheet, ScrollView, View, Text, RefreshControl, Picker, Alert, TouchableOpacity,} from "react-native";
import {Actions} from 'react-native-router-flux';
import Api from '../Api';
import ErrorView from '../components/ErrorView';
import NavBar from '../components/NavBar';
import FeedItem from '../components/FeedItem';
import RepoItem from '../components/RepoItem';
import XListView from '../components/XListView';
import config from '../config';

export default class Trends extends Component {

  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this._onLanguageSelected = this._onLanguageSelected.bind(this);
    this.state = {
      language: "all",
    };
  }

  _onLanguageSelected(lang) {
    this.setState({language: lang});
    if (Platform.OS === 'ios')
      Alert.alert(
        null,
        `change language to ${lang} ?`,
        [
          {text: 'Cancel'},
          {text: 'OK', onPress: () => {
            this.listView._onFetch();
          }},
        ]
      );
    else this.listView._onFetch();
  }

  _renderRow(repo) {
    return (
      <RepoItem repo={repo} key={repo.id} />
    );
  }

  render() {
    let picker = (
      <Picker
        style={styles.picker}
        selectedValue={this.state.language}
        onValueChange={this._onLanguageSelected}
        mode="dropdown"
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="All" value="all" />
        <Picker.Item label="JavaScript" value="javascript" />
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="Python" value="python" />
        <Picker.Item label="CSS" value="css" />
        <Picker.Item label="PHP" value="php" />
        <Picker.Item label="Ruby" value="ruby" />
        <Picker.Item label="C++" value="c++" />
        <Picker.Item label="C" value="c" />
        <Picker.Item label="Objective-C" value="objective-c" />
        <Picker.Item label="Swift" value="swift" />
        <Picker.Item label="Shell" value="shell" />
        <Picker.Item label="Go" value="go" />
      </Picker>
    );
    return (
      <View style={styles.container}>
        <NavBar title="Trending" hasLeftBackBtn={false} rightBtn={picker} />
        <XListView
          ref={(listView) => this.listView = listView}
          onFetch={{func: Api.getTrends, args: [this.state.language]}}
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
  picker: {
    width: 85,
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: '300',
    color: config.themeColor,
  },
});
