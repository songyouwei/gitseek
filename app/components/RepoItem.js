import React, {Component, PropTypes} from "react";
import {Dimensions, Image, InteractionManager, Animated, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Octicons';
import Avatar from '../components/Avatar';
import StatefulImage from '../components/StatefulImage';
import config from '../config';

export default class RepoItem extends Component {
  static propTypes = {
    repo: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  _onRepoPress(repo) {
    Actions.webPage({
      url: `${repo.htmlUrl}/blob/master/README.md`,
      title: repo.fullName,
      repo: repo,
    });
  }

  _onOwnerPress(owner) {
    Actions.user({user: owner});
  }

  render() {
    let {fullName, language, owner, stargazersCount, forksCount, description, watchersCount, htmlUrl} = this.props.repo;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.left}>
          <Avatar style={styles.avatar} url={owner.avatarUrl} size={56} onPress={() => this._onOwnerPress(owner)} />
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
    marginTop: 20,
    backgroundColor: '#fafafa',
  },
  left: {
    padding: 5,
  },
  avatar: {
  },
  actionIcon: {
    marginTop: 5,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    marginLeft: 10,
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
