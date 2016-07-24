import React, {Component, PropTypes} from "react";
import {Dimensions, Platform, TouchableOpacity, Image, InteractionManager, Animated, StyleSheet, ScrollView, View, Text, Alert} from "react-native";
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Octicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Api from '../Api';
import Avatar from '../components/Avatar';
import LoadingIndicator from '../components/LoadingIndicator';
import UserRepoItem from '../components/UserRepoItem';
import AwesomeButton from 'react-native-awesome-button';
import config from '../config';

export default class UserAbout extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._onSettingPressed = this._onSettingPressed.bind(this);
    this._onFollow = this._onFollow.bind(this);
    this._onUnFollow = this._onUnFollow.bind(this);
    this.state = {
      user: this.props.user || {},
      starsCount: null,
      isMe: !this.props.user,
      buttonState: 'wait',
    };
  }

  componentDidMount() {
    let userLogin = this.state.user.login;
    Api.getUser(userLogin).then(user => {
      this.setState({
        user: user,
      });
    });
    Api.followed(userLogin).then(followed => {
      this.setState({ buttonState: followed?'unfollow':'follow' });
    }, err => console.warn(err));
    Api.getUserStarsCount(userLogin).then(starsCount => {
      this.setState({
        starsCount: starsCount,
      });
    });
  }

  _onSettingPressed() {
    Actions.setting();
  }

  _onFollow() {
    this.setState({ buttonState: 'wait' });
    let userLogin = this.state.user.login;
    Api.follow(userLogin).then(res => {
      this.setState({ buttonState: 'unfollow' });
    });
  }

  _onUnFollow() {
    this.setState({ buttonState: 'wait' });
    let userLogin = this.state.user.login;
    Api.unfollow(userLogin).then(res => {
      this.setState({ buttonState: 'follow' });
    });
  }

  render() {
    let {user, starsCount, isMe} = this.state;
    let {name, bio, login, blog, email, avatar_url, avatarUrl, followers, following, type} = user;
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} >
          {isMe?
            <TouchableOpacity style={styles.settingWrapper} onPress={this._onSettingPressed} >
              <Icon name="gear" size={25} color="#666" />
            </TouchableOpacity>
            :
            null
          }
          <View style={styles.briefInfo} >
            <Avatar url={avatar_url || avatarUrl} size={120} />
            {name && <Text style={styles.userNameText}>{name}</Text>}
            <Text style={styles.userLoginText}>{bio || login}</Text>
            {blog && <Text style={styles.userBlogText}>{blog}</Text>}
            {!isMe && type !== 'Organization' &&
              <AwesomeButton
                backgroundStyle={styles.followButtonBackground}
                labelStyle={styles.followButtonLabel}
                transitionDuration={200}
                states={{
                  follow: {
                    text: 'follow',
                    onPress: this._onFollow,
                    backgroundColor: config.themeColor,
                  },
                  wait: {
                    text: `wait...`,
                    backgroundColor: '#0b7bc8',
                    spinner: true,
                  },
                  unfollow: {
                    text: `unfollow`,
                    backgroundColor: '#339944',
                    onPress: this._onUnFollow,
                  }
                }}
                buttonState={this.state.buttonState}
              />
            }
          </View>
        </ScrollView>
        {type !== 'Organization' &&
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
        }
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.darkerBackgroundColor,
  },
  briefInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
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
    marginTop: 20,
  },
  userLoginText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  userBlogText: {
    fontSize: 14,
    color: config.themeColor,
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
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
  followButtonBackground: {
    width: 120,
    height: 30,
    margin: 10,
    borderRadius: 5
  },
  followButtonLabel: {
    color: 'white'
  }
});
