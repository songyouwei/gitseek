import React, {
  PropTypes,
  Component,
  Dimensions,
  Image,
  InteractionManager,
  Animated,
  StyleSheet,
  ScrollView,
  View,
  Text,
  RefreshControl,
  WebView,
}  from 'react-native';
import {Actions} from 'react-native-router-flux';
import ErrorView from '../components/ErrorView';
import LoadingIndicator from '../components/LoadingIndicator';
import NavBar from '../components/NavBar';
import config from '../config';

export default class WebPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
    }
  }

  componentDidMount() {
  }

  render() {
    let {url} = this.state;
    let {title} = this.props;
    return (
      <View style={styles.container}>
        <NavBar title={title} hasLeftBackBtn={true} />
        <WebView
          ref={(webView) => this.webView = webView}
          styles={{flex: 1}}
          source={{uri: url}}
          automaticallyAdjustContentInsets={false}
          contentInset={{top: 0, left: 0, bottom: 49, right: 0}}
          renderLoading={() => <LoadingIndicator style={styles.tip} /> }
          renderError={() => <ErrorView style={styles.tip} /> }
          javaScriptEnabled={true}
          startInLoadingState={true} />
      </View>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: config.backgroundColor,
  },
  scrollView: {
    flex: 1,
    padding: 5,
  },
  tip: {
    marginTop: 20,
  },
});
