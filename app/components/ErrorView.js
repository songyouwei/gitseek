import React, {
  PropTypes,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class ErrorView extends Component {
  render() {
    let {msg, msgStyle} = this.props;
    return (
    	<View style={[styles.container,this.props.style]}>
    		<Text style={[styles.msgText,this.props.msgTextStyle]}>{msg?msg:"oops, fetch failed!"}</Text>
    	</View>
    );
  }
};
ErrorView.propTypes = {
  msg: PropTypes.string,
  msgStyle: PropTypes.object,
  style: PropTypes.object,
};

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
