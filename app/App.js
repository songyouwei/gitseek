import React, {
  PropTypes,
  Component,
  StyleSheet,
  BackAndroid,
  ToastAndroid,
  StatusBar,
  Navigator,
  Platform,
  Text,
} from 'react-native';
import {Actions, Schema, Route, Router} from 'react-native-router-flux';
import Api from './Api';
import ErrorView from './components/ErrorView';
import HomeTabs from './pages/HomeTabs';
import Search from './pages/Search';
import Setting from './pages/Setting';
import About from './pages/About';
import WebPage from './pages/WebPage';

export default class App extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'ios') {
      StatusBar.setHidden(false);
      // StatusBar.setBarStyle('light-content', true);
    } else {
      BackAndroid.addEventListener('hardwareBackPress', ()=>{
        try {
          if (Actions.pop() != null) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      });
    }
    Api.init();
  }

  render() {
    return (
      <Router hideNavBar={true}>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight} hideNavBar={true} />
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom} hideNavBar={true} />

        <Route name="homeTabs" component={HomeTabs} type="reset" initial={true} />
        <Route name="search" component={Search} />
        <Route name="setting" component={Setting} />
        <Route name="about" component={About} />
        <Route name="webPage" component={WebPage} />
      </Router>
    );
  }
};
