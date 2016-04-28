import React, {
  PropTypes,
  Component,
  Dimensions,
  TouchableOpacity,
  Image,
  InteractionManager,
  Animated,
  StyleSheet,
  View,
  Text,
  Platform,
}  from 'react-native';

export default class Avator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {url, source, size, onPress} = this.props;
    if (size) {
      styles.avatorImg = {
        width: size,
        height: size,
        borderRadius: size/2,
      };
    }
    if (onPress) return (
      <TouchableOpacity style={this.props.style} onPress={onPress} >
        <Image
          style={styles.avatorImg}
          source={url?{uri: url}:(source?source:null)}
        />
      </TouchableOpacity>
    );
    else return (
      <View style={this.props.style} >
        <Image
          style={styles.avatorImg}
          source={url?{uri: url}:(source?source:null)}
        />
      </View>
    );
  }
};

let styles = StyleSheet.create({
  avatorImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
