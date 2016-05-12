import React, {Component, PropTypes} from "react";
import {Dimensions, TouchableOpacity, Image, InteractionManager, Animated, StyleSheet, View, Text, Platform} from "react-native";
import StatefulImage from './StatefulImage';

export default class Avatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {url, source, size, onPress} = this.props;
    let image = (
      <StatefulImage
        style={[styles.avatorImg, size?{
          width: size,
          height: size,
          borderRadius: size/2,
        }:null]}
        source={url?{uri: url}:(source?source:null)}
      />
    );
    if (onPress) return (
      <TouchableOpacity style={this.props.style} onPress={onPress} >
        {image}
      </TouchableOpacity>
    );
    else return (
      <View style={this.props.style} >
        {image}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  avatorImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
});
