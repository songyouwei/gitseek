import React, {Component, PropTypes} from "react";
import {Dimensions, Image, InteractionManager, Animated, StyleSheet, ScrollView, View, Text, RefreshControl, Picker} from "react-native";
import {Actions} from 'react-native-router-flux';
import Api from '../Api';
import ErrorView from '../components/ErrorView';
import NavBar from '../components/NavBar';
import FeedItem from '../components/FeedItem';
import RepoItem from '../components/RepoItem';
import config from '../config';

export default class Trends extends Component {

  constructor(props) {
    super(props);
    this._onFetch = this._onFetch.bind(this);
    this.state = {
      isLoading: true,
      results: [],
      err: null,
      language: "all",
    };
  }

  componentDidMount() {
    //set timeout to fix a refresh state problem
    setTimeout(this._onFetch, 0);
  }

  _onFetch() {
    this.setState({
      isLoading: true,
    });
    Api.getTrends(this.state.language).then(res => {
      this.setState({
        isLoading: false,
        results: res,
      });
    }, err => {
      this.setState({
        isLoading: false,
        err: err,
      });
    });
  }

  render() {
    let {isLoading, results, err} = this.state;
    let items = [];
    !(results instanceof Array) && (results = results.items);
    results && results instanceof Array && results.map(repo => {
      items.push(
        <RepoItem repo={repo} key={repo.id} />
      );
    });
    let picker = (
      <Picker
        style={{width: 25, height: 25, backgroundColor: '#666'}}
        selectedValue={this.state.language}
        onValueChange={(lang) => this.setState({language: lang})}>
        <Picker.Item label="JavaScript" value="javascript" />
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="Python" value="python" />
        <Picker.Item label="Ruby" value="ruby" />
        <Picker.Item label="PHP" value="php" />
        <Picker.Item label="CSS" value="css" />
        <Picker.Item label="Objective-C" value="objective-c" />
        <Picker.Item label="Swift" value="swift" />
        <Picker.Item label="C++" value="c++" />
        <Picker.Item label="C#" value="c#" />
        <Picker.Item label="C" value="c" />
        <Picker.Item label="Go" value="go" />
        <Picker.Item label="Shell" value="shell" />
      </Picker>
    );
    return (
      <View style={styles.container}>
        <NavBar title="Trending" rightBtn={picker} />
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={this._onFetch}
            />
          }>
          {picker}
          {/*{
            !err && results
            ?(items.length>0?items:null)
            :<ErrorView msg={err} />
          }*/}
        </ScrollView>
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
});
