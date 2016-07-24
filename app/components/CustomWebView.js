import React, {
  Component,
  StyleSheet,
  WebView,
  View,
  PropTypes,
} from 'react-native';
import WebToolBar from '../components/WebToolBar';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorView from '../components/ErrorView';

export default class CustomWebView extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
    this.state = {
      url: props.url,
      backable: false,
      forwardable: false,
      refreshable: false,
      loading: false,
    };
  }

  _onNavigationStateChange(e) {
    this.setState({
      url: e.url,
      backable: e.canGoBack,
      forwardable: e.canGoForward,
      refreshable: e.url && !e.loading,
      loading: e.loading,
    });
  }

  render() {
    const { url, backable, forwardable, refreshable, loading } = this.state;
    let webToolBar = (
      <WebToolBar
        url={url}
        goBack={this.webView && this.webView.goBack}
        goForward={this.webView && this.webView.goForward}
        onRefresh={this.webView && this.webView.reload}
        backable={backable}
        forwardable={forwardable}
        refreshable={refreshable}
        loading={loading}
      />
    );
    return (
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          ref={(webView) => { this.webView = webView; }}
          source={{ uri: url }}
          onNavigationStateChange={this._onNavigationStateChange}
          renderLoading={() => <LoadingIndicator style={styles.tip} />}
          renderError={() => <ErrorView style={styles.tip} />}
          startInLoadingState={true}
          allowsInlineMediaPlayback={true}
        />
        {webToolBar}
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
