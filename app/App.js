import React, {Component, PropTypes} from "react";
import {StyleSheet, BackAndroid, ToastAndroid, StatusBar, Navigator, Platform, Text} from "react-native";
import {Actions, Schema, Route, Router} from 'react-native-router-flux';
import Api from './Api';
import ErrorView from './components/ErrorView';
import HomeTabs from './pages/HomeTabs';
import Login from './pages/Login';
import Search from './pages/Search';
import Setting from './pages/Setting';
import About from './pages/About';
import User from './pages/User';
import WebPage from './pages/WebPage';

export default class App extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    if (Platform.OS === 'ios') {
      StatusBar.setHidden(false);
      // StatusBar.setBarStyle('light-content', true);
    } else {
      BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());
    }
    Api.init();
  }

  render() {
    return (
      <Router hideNavBar={true}>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight} hideNavBar={true} />
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom} hideNavBar={true} />

        <Route name="homeTabs" component={HomeTabs} initial={true} type="reset" />
        <Route name="login" component={Login} />
        <Route name="search" component={Search} />
        <Route name="setting" component={Setting} />
        <Route name="about" component={About} />
        <Route name="user" component={User} />
        <Route name="webPage" component={WebPage} />
      </Router>
    );
  }
}
