import React, {
  PropTypes,
  Component,
  ProgressBarAndroid,
  ActivityIndicatorIOS,
  Platform,
} from 'react-native';

export default class LoadingIndicator extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['small', 'large']),
  };

  static defaultProps = {
    size: 'large',
  };

  render() {
    const { size } = this.props;
    let androidSize;
    switch (size) {
      case 'small':
        androidSize = 'Small';
        break;
      default:
        androidSize = 'Large';
    }
    if (Platform.OS === 'ios') {
      return <ActivityIndicatorIOS style={this.props.style} size={size} />;
    }
    return <ProgressBarAndroid style={this.props.style} styleAttr={androidSize} />;
  }
}
