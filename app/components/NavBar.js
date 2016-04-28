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
  Platform,
  TouchableOpacity,
}  from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Octicons';
import config from '../config';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {title, hasLeftBackBtn, rightBtn} = this.props;
    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.left}>
          {hasLeftBackBtn?
          <TouchableOpacity onPress={()=>Actions.pop()}>
            <Icon name="chevron-left" size={25} color="#fff" />
          </TouchableOpacity>:null}
        </View>
        <View style={styles.title}><Text style={styles.titleTxt}>{title}</Text></View>
        <View style={styles.right}>
          {rightBtn?rightBtn:null}
        </View>
      </View>
    );
  }
};
NavBar.propTypes = {
  title: PropTypes.string,
  hasLeftBackBtn: PropTypes.bool,
  rightBtn: PropTypes.element,
};

let styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: config.barColor,
    height: Platform.OS==='ios'?64:44,
    paddingTop: Platform.OS==='ios'?20:0,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 15,
  },
  imageButton: {
    width: 25,
    height: 25,
  },
});
