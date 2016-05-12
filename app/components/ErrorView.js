import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";

export default class ErrorView extends Component {

  static propTypes = {
    msg: PropTypes.any,
  };

  render() {
    let {msg, msgStyle} = this.props;
    let defaultErr = "oops, fetch failed!";
    return (
    	<View style={[styles.container,this.props.style]}>
    		<Text style={[styles.msgText,this.props.msgTextStyle]}>
          {
            msg
            ?(typeof msg === 'string'?msg:(msg.message || defaultErr))
            :defaultErr
          }
        </Text>
    	</View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
