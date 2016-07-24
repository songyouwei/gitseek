import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingWrapper from '../components/LoadingWrapper';

const SIZE_ICON = 30;

export default class WebToolBar extends Component {
  static propTypes = {
    url: PropTypes.string,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    onRefresh: PropTypes.func,
    backable: PropTypes.bool,
    forwardable: PropTypes.bool,
    refreshable: PropTypes.bool,
    loading: PropTypes.bool,
    showAddressBar: PropTypes.bool,
  };

  render() {
    const {
      url,
      goBack,
      goForward,
      onRefresh,
      backable,
      forwardable,
      refreshable,
      loading,
      showAddressBar,
    } = this.props;

    const backOpacity = backable ? 0.5 : 1.0;
    const backColor = backable ? 'white' : 'grey';

    const forwardOpacity = forwardable ? 0.5 : 1.0;
    const forwardColor = forwardable ? 'white' : 'grey';

    const refreshOpacity = refreshable ? 0.5 : 1.0;
    const refreshColor = refreshable ? 'white' : 'grey';

    const addressView = (
      showAddressBar
      ?
        <Text style={styles.url} numberOfLines={1}>{url}</Text>
      :
        <View style={{ flex: 1 }} />
    );

    return (
      <View style={styles.webViewToolBar}>
        <View style={styles.webLeft}>
          <TouchableOpacity
            onPress={goBack}
            activeOpacity={backOpacity}
          >
            <Icon
              name="ios-arrow-back"
              size={SIZE_ICON}
              style={styles.icon}
              color={backColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goForward}
            activeOpacity={forwardOpacity}
          >
            <Icon
              name="ios-arrow-forward"
              size={SIZE_ICON}
              style={styles.icon}
              color={forwardColor}
            />
          </TouchableOpacity>
        </View>
        {addressView}
        <LoadingWrapper style={styles.icon} loading={loading} size="small">
          <TouchableOpacity
            onPress={onRefresh}
            activeOpacity={refreshOpacity}
          >
            <Icon
              name="ios-refresh-outline"
              size={SIZE_ICON}
              style={styles.icon}
              color={refreshColor}
            />
          </TouchableOpacity>
        </LoadingWrapper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  webViewToolBar: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: 40,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  webLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: SIZE_ICON,
    height: SIZE_ICON,
    marginLeft: 15,
  },
  url: {
    flex: 1,
    color: '#bbb',
  },
});
