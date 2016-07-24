import React, {Component, PropTypes} from "react";
import {Dimensions, Image, InteractionManager, Animated, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Octicons';
import Avatar from '../components/Avatar';
import StatefulImage from '../components/StatefulImage';
import config from '../config';

export default class UserRepoItem extends Component {
  static propTypes = {
    repo: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  _onRepoPress(repo) {
    Actions.webPage({
      url: repo.htmlUrl,
      title: repo.fullName
    });
  }

  _onOwnerPress(owner) {
    Actions.webPage({
      url: owner.htmlUrl,
      title: owner.login
    });
  }

  render() {
    let {fork, fullName, language, owner, stargazersCount, forksCount, description, watchersCount, htmlUrl} = this.props.repo;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.left}>
          <View style={styles.actionIcon}>
            <Icon name={fork ? 'repo-forked' : 'repo'} size={25} color={config.iconColor} />
          </View>
        </View>
        <View style={styles.right}>
        <TouchableOpacity onPress={() => this._onRepoPress(this.props.repo)}>
          <Text style={styles.name}>{fullName}</Text>
        </TouchableOpacity>
        <Text style={styles.language}>#{language}#</Text>
          <View style={styles.statistics}>
            <Icon style={styles.action} name="star" > {stargazersCount}</Icon>
            <Icon style={styles.action} name="repo-forked" > {forksCount}</Icon>
            <Icon style={styles.action} name="eye" > {watchersCount}</Icon>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginTop: 15,
    backgroundColor: '#fafafa',
  },
  left: {
    width: 50,
    alignItems: 'center',
  },
  actionIcon: {
    marginTop: 10,
    alignItems: 'center',
  },
  right: {
    flex: 1,
  },
  name: {
    color: config.linkColor,
    fontWeight: '400',
    fontSize: 15,
    marginTop: 1,
  },
  language: {
    marginTop: 5,
    color: '#666',
    fontSize: 12,
  },
  statistics: {
    flexDirection: 'row',
    marginTop: 5,
  },
  action: {
    fontWeight: '400',
    fontSize: 13,
    marginRight: 15,
  },
  description: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '400',
  },
});
