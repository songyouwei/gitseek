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
import Avator from '../components/Avator';
import LoadingIndicator from '../components/LoadingIndicator';
import NavListItem from '../components/NavListItem';
import config from '../config';

export default class My extends Component {

  constructor(props) {
    super(props);
    this.onSettingPressed = this.onSettingPressed.bind(this);
    this.state = {
      user: {},
    };
  }

  componentWillMount() {
    Api.getLoggedUser().then(user => {
      this.setState({
        user: user,
      });
    });
  }

  render() {
    let {name, login, blog, email, avatarUrl,} = this.state.user;
    return (
      <ScrollView style={styles.container} >
        <View style={styles.briefInfo} >
          <TouchableOpacity style={styles.settingWrapper} onPress={this.onSettingPressed} >
            <Icon name="gear" size={25} color="#fff" />
          </TouchableOpacity>
          <Avator url={avatarUrl} size={91} />
          <Text style={styles.authorNameText}>{name}</Text>
          <Text style={styles.authorBriefText} numberOfLines={3} >{blog}</Text>
        </View>
        <View style={styles.slidesTypes} >
          {/*<NavListItem name="喜欢的讲义" iconSource={require('../images/like.png')} onPress={()=>Actions.slideGrid({title: "喜欢的讲义", contentType: "liked", url: user.link_lecture_like})} />
          <NavListItem name="下载的讲义" iconSource={require('../images/download.png')} onPress={()=>Actions.slideGrid({title: "下载的讲义", contentType: "downloaded"})} />
          <NavListItem name="上传的讲义" iconSource={require('../images/upload.png')} onPress={()=>Actions.slideGrid({title: "上传的讲义", contentType: "uploaded", url: user.own})} />*/}
        </View>
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
    height: 276,
    backgroundColor: 'rgb(53,59,55)',
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
  authorNameText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 12,
  },
  authorBriefText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 14,
    marginLeft: 25,
    marginRight: 25,
  },
  slidesTypes: {
  },
  tintInfo: {
    marginTop: 46,
    marginBottom: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tintInfoText: {
    color: '#777777',
    fontSize: 15,
    marginTop: 10,
  },
});
