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
import Icon from 'react-native-vector-icons/Octicons';
import config from '../config';

export default class NavListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {icon, name, rightComponent, onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress} >
      <View>
        <View style={styles.container}>
          <View style={styles.left}>
            {icon}
          </View>
          <View style={styles.name}><Text style={styles.nameTxt}>{name}</Text></View>
          <View style={styles.right}>
            <View style={styles.rightComponent}>{rightComponent}</View>
            <Icon name="chevron-right" size={25} color={config.iconColor} />
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#fff',
    marginTop: 1,
  },
  left: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  name: {
    flex: 1,
    marginLeft: 25,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  nameTxt: {
    fontSize: 15,
    color: '#000',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 23,
  },
  rightComponent: {
    marginRight: 10,
  },
});
