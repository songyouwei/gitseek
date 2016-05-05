import React, {
  PropTypes,
  Component,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
  InteractionManager,
  Animated,
  StyleSheet,
  ScrollView,
  View,
  Text,
}  from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Octicons';
import Api from '../Api';
import Avatar from '../components/Avatar';
import LoadingIndicator from '../components/LoadingIndicator';
import NavListItem from '../components/NavListItem';
import RepoItem from '../components/RepoItem';
import config from '../config';

export default class My extends Component {

  constructor(props) {
    super(props);
    this.onSettingPressed = this.onSettingPressed.bind(this);
    this.state = {
      user: {},
      starsCount: null,
      repos: [],
    };
  }

  componentWillMount() {
    Api.getLoggedUser().then(user => {
      this.setState({
        user: user,
      });
    });
    Api.getUserRepos().then(repos => {
      this.setState({
        repos: repos,
      });
    });
    Api.getUserStarsCount().then(starsCount => {
      this.setState({
        starsCount: starsCount,
      });
    });
  }

  render() {
    let {name, login, blog, email, avatar_url, followers, following} = this.state.user;
    let {starsCount} = this.state;
    let repos = this.state.repos;
    let items = [];
    repos && repos instanceof Array && repos.map(repo => {
      items.push(
        <RepoItem repo={repo} key={repo.id} />
      );
    });
    return (
      <ScrollView style={styles.container} >
        <View style={styles.briefInfo} >
          <TouchableOpacity style={styles.settingWrapper} onPress={this.onSettingPressed} >
            <Icon name="gear" size={25} color="#666" />
          </TouchableOpacity>
          <Avatar url={avatar_url} size={91} />
          {name && <Text style={styles.userNameText}>{name}</Text>}
          <Text style={styles.userLoginText}>{login}</Text>
          {blog && <Text style={styles.userBlogText}>{blog}</Text>}
        </View>
        <View style={styles.statInfo}>
          <View style={styles.statItem}>
            <Text style={styles.statNumText}>{followers || '0'}</Text>
            <Text style={styles.statNameText}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumText}>{starsCount || '0'}</Text>
            <Text style={styles.statNameText}>Stars</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumText}>{following || '0'}</Text>
            <Text style={styles.statNameText}>Following</Text>
          </View>
        </View>
        <ScrollView style={styles.repos} >
          {items}
        </ScrollView>
      </ScrollView>
    );
  }

  onSettingPressed() {
    Actions.setting();
  }
};
My.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.object,
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: config.backgroundColor,
  },
  briefInfo: {
    height: 225,
    backgroundColor: config.darkerBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS==='ios'?10:0,
  },
  settingWrapper: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: Platform.OS==='ios'?28:18,
    right: 20,
  },
  settingIcon: {
    width: 25,
    height: 25,
  },
  userNameText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 12,
  },
  userLoginText: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  userBlogText: {
    fontSize: 14,
    color: config.themeColor,
    marginTop: 3,
    marginLeft: 25,
    marginRight: 25,
  },
  repos: {
    flex: 1,
    padding: 5,
  },
  statInfo: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  statItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  statNumText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  statNameText: {
    fontSize: 12,
  },
});
