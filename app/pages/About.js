import React, {Component, PropTypes} from "react";
import {Dimensions, Image, InteractionManager, Animated, StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import NavBar from '../components/NavBar';
import config from '../config';

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar title="About" hasLeftBackBtn={true} />
        <View style={styles.contentContainer}>
          <Text style={styles.logo}>GitSeek</Text>
          <Text style={styles.info}>A Github app</Text>
          <Text style={styles.info}>Powered by React Native</Text>
          <Text style={styles.info}>Written in ES6</Text>
          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>Copyright©2016  http://youwei.ml/</Text>
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: config.backgroundColor,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
  },
  info: {
    marginTop: 15,
    fontSize: 15,
  },
  copyright: {
    position: 'absolute',
    bottom: 20,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  copyrightText: {
    fontSize: 12,
  },
});
