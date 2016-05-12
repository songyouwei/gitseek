import React, {Component, PropTypes} from "react";
import {Dimensions, Image, InteractionManager, Animated, StyleSheet, ScrollView, View, Text} from "react-native";
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Octicons';
import Api from '../Api';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home';
import Trends from './Trends';
import User from './User';
import config from '../config';

export default class HomeTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }

  render() {
    return (
      <TabNavigator tabBarStyle={styles.tabbar} >
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          renderIcon={(selected) => <Icon name="home" size={25} color={selected?config.themeColor:config.iconColor} />}
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <Home />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'trends'}
          renderIcon={(selected) => <Icon name="flame" size={25} color={selected?config.themeColor:config.iconColor} />}
          onPress={() => this.setState({ selectedTab: 'trends' })}>
          <Trends />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'my'}
          renderIcon={(selected) => <Icon name="mark-github" size={25} color={selected?config.themeColor:config.iconColor} />}
          onPress={() => {
            // if(!Api.logined())
            //   Actions.login();
            // else
              this.setState({ selectedTab: 'my' });
          }}>
          <User />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

let styles = StyleSheet.create({
  tabbar: {
    height: 49,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: config.barColor,
  },
});
