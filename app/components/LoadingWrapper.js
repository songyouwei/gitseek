import React, {
  Component,
  PropTypes,
} from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';

export default class LoadingWrapper extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['small', 'large']),
    loading: PropTypes.bool.isRequired,
  }
  render() {
    if (this.props.loading) {
      return <LoadingIndicator {...this.props} />;
    }
    return this.props.children;
  }
}
