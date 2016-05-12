import React, {Component, PropTypes} from "react";
import {Dimensions, Image, InteractionManager, Animated, StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert} from "react-native";
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Octicons';
import Api from '../Api';
import NavBar from '../components/NavBar';
import Avatar from '../components/Avatar';
import NavListItem from '../components/NavListItem';
import LoadingIndicator from '../components/LoadingIndicator';
import config from '../config';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this._clearCache = this._clearCache.bind(this);
    this.state = {
      user: {},
      cacheSize: '0.0M',
    };
  }

  _clearCache() {
    Api.clearCache().then(res => {
      res && this.setState({cacheSize: '0.0M'});
      Alert.alert(null, `cache cleared ${res?'success':'failed'}`);
    });
  }

  componentWillMount() {
    // Api.getLoggedUserProfile();
    Api.getCacheSize().then(cache => this.setState({cacheSize: cache}));
  }

  render() {
    let {user, cacheSize} = this.state;
    let brief = (
      <View style={{width: 206, alignItems: 'flex-end'}} >
        <Text numberOfLines={1} style={{fontSize: 15, color: '#ffffff', }} >{user.introduction}</Text>
      </View>
    );
    let cache = (
      <Text style={{fontSize: 15, color: '#cccccc'}} >{cacheSize}</Text>
    );
    return (
      <View style={styles.container}>
        <NavBar title="Settings" hasLeftBackBtn={true} />
        <ScrollView>
          <NavListItem icon={<Icon name="trashcan" size={25} color={config.iconColor} />} name="clear cache" rightComponent={cache} onPress={this._clearCache} />
          <NavListItem icon={<Icon name="info" size={25} color={config.iconColor} />} name="about" onPress={()=>Actions.about()} />
          <View style={styles.logout} >
            <TouchableOpacity style={styles.logoutButton} onPress={()=>{
              Api.logout();
              Actions.homeTabs();
            }} >
              <Text style={styles.logoutText} >Signout</Text>
            </TouchableOpacity>
          </View>
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
  logout: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    width: 280,
    height: 46,
    marginTop: 60,
    marginBottom: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(48,55,66)',
  },
  logoutText: {
    fontSize: 18,
    color: '#fff',
  },
});
