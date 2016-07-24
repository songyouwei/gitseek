import React, {Component, PropTypes} from "react";
import {View, Platform} from "react-native";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Api from '../Api';
import UserAbout from '../components/UserAbout';
import UserRepos from '../components/UserRepos';
import OrgaPeople from '../components/OrgaPeople';
import NavBar from '../components/NavBar';

export default class User extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    let {user} = this.props;
    return (
      <View style={[{flex:1}, user?null:{paddingTop: Platform.OS==='ios'?20:0}]}>
        {user?
          <NavBar title={user.login} hasLeftBackBtn={true} />
          :
          null
        }
        <ScrollableTabView
          tabBarUnderlineColor={config.linkColor}
          tabBarActiveTextColor={config.linkColor}
          >
          <UserAbout tabLabel="About" user={user} />
          <UserRepos tabLabel="Repos" user={user} />
          {user && user.type === 'Organization' ?
            <OrgaPeople tabLabel="People" orga={user} />
            :
            null
          }
        </ScrollableTabView>
      </View>
    );
  }
}
