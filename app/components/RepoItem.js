import React, {
  PropTypes,
  Component,
  Dimensions,
  Image,
  InteractionManager,
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
}  from 'react-native';
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

  render() {
    let {full_name, fullName, language, owner, stargazers_count, stargazersCount, forks_count, forksCount, description, watchers_count, watchersCount} = this.props.repo;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.left}>
          <Avatar style={styles.avatar} url={owner.avatar_url || owner.avatarUrl} size={56} />
        </View>
        <View style={styles.right}>
        <Text style={styles.name}>{full_name || fullName}</Text>
        <Text style={styles.language}>#{language}#</Text>
          <View style={styles.statistics}>
            <Icon style={styles.action} name="star" > {stargazers_count || stargazersCount}</Icon>
            <Icon style={styles.action} name="repo-forked" > {forks_count || forksCount}</Icon>
            <Icon style={styles.action} name="eye" > {watchers_count || watchersCount}</Icon>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    );
  }

};

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginTop: 35,
    backgroundColor: '#fafafa',
  },
  left: {
    position: 'absolute',
    top: -28,
  },
  avatar: {
  },
  actionIcon: {
    marginTop: 5,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    marginLeft: 55,
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
