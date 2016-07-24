import React, {
  PropTypes,
  Component,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingIndicator from '../components/LoadingIndicator';

export default class StatefulImage extends Component {
  static propTypes = {
    source: PropTypes.any.isRequired,
  };
  constructor(props) {
    super(props);
    const { source } = this.props;
    const noUri = source && source.hasOwnProperty('uri') && !source.uri;
    this.state = {
      loaded: false,
      failed: noUri,
    };
  }

  render() {
    const { source, children } = this.props;
    const { loaded, failed } = this.state;
    let content;
    if (failed) content = <Icon name="ios-help" size={40} color="red" />;
    else if (!this.state.loaded) content = <LoadingIndicator size="small" />;
    else content = children;
    return (
      <Image
        style={[{ justifyContent: 'center', alignItems: 'center' }, this.props.style]}
        source={source}
        onLoadStart={() => {
        }}
        onLoad={() => {
          this.setState({ loaded: true });
        }}
        onLoadEnd={() => {
          this.setState({ loaded: true });
        }}
        onError={() => {
          this.setState({ failed: true });
        }}
      >
        {content}
      </Image>
    );
  }
}
