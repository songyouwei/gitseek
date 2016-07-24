import React, { Component, PropTypes } from "react";
import { Dimensions, Image, InteractionManager, Animated, StyleSheet, ScrollView, View, Text, Alert, RefreshControl, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Octicons';
import Api from '../Api';
import NavBar from '../components/NavBar';
import CustomWebView from '../components/CustomWebView';
import config from '../config';

export default class WebPage extends Component {

  static propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    repo: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._starRepo = this._starRepo.bind(this);
    this.state = {
      url: this.props.url,
      starred: false,
    }
  }

  _starRepo() {
    const { starred } = this.state;
    const { repo } = this.props;
    if (!starred) Api.starRepo(repo).then(
      res => this.setState({ starred: true }),
      err => Alert.alert(null, err.json.message)
    );
    else Api.unStarRepo(repo).then(
      res => this.setState({ starred: false }),
      err => Alert.alert(null, err.json.message)
    );
  }

  render() {
    const { url, starred } = this.state;
    const { title, repo } = this.props;
    const starBtn = repo && (
      <TouchableOpacity onPress={this._starRepo}>
        <Icon name="star" size={30} color={starred ? config.themeColor : 'grey'} />
      </TouchableOpacity>
    );
    return (
      <View style={styles.container}>
        <NavBar title={title} hasLeftBackBtn={true} rightBtn={starBtn} />
        <CustomWebView url={url} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: config.backgroundColor,
  },
  scrollView: {
    flex: 1,
    padding: 5,
  },
  tip: {
    marginTop: 20,
  },
});
