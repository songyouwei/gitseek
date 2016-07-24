import React, {Component, PropTypes} from "react";
import {Dimensions, Image, InteractionManager, Animated, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Octicons';
import Avatar from '../components/Avatar';
import config from '../config';

export default class UserItem extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  _onPress(user) {
    Actions.user({user: user});
  }

  render() {
    let {user} = this.props;
    let {name, bio, login, blog, email, avatarUrl, followers, following} = user;
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={() => this._onPress(user)} >
        <Avatar style={styles.avatar} url={avatarUrl} size={56} onPress={() => this._onPress(user)} />
        <Text style={styles.name}>{login}</Text>
      </TouchableOpacity>
    );
  }

}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginTop: 10,
    backgroundColor: '#fafafa',
  },
  avatar: {
  },
  name: {
    color: config.linkColor,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 20,
  },
});
