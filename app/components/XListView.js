import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View, ListView, RefreshControl} from "react-native";
import ErrorView from '../components/ErrorView';

export default class XListView extends Component {

  static propTypes = {
    onFetch: PropTypes.func.isRequired,//a function that returns a Promise<Rows>
    renderRow: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._setRows = this._setRows.bind(this);
    this._getRows = this._getRows.bind(this);
    this._onFetch = this._onFetch.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
    this._setRows([]);
    this.state = {
      isLoading: false,
      isRefreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(this._getRows()),
      nextPage: null,
      err: null,
    };
  }

  _setRows(rows) { this._rows = rows; }
  _getRows() { return this._rows; }

  componentDidMount() {
    this._onFetch();
  }

  _renderHeader() {
    let {err} = this.state;
    if (err && this._getRows().length === 0)
      return (
        <ErrorView style={styles.header} msg={err} />
      );
  }

  _renderFooter() {
    let {err} = this.state;
    if (this._getRows().length > 0)
      return (
        <View style={styles.loadMore}>
          <Text style={styles.loadMoreText} >
            {err || 'loading...'}
          </Text>
        </View>
      );
    else return null;
  }

  prevFetchPromise = null;
  _onFetch(more = false) {
    let fetchPromise = !more ? this.props.onFetch : this.state.nextPage;
    if (fetchPromise === this.prevFetchPromise) return;
    else this.prevFetchPromise = fetchPromise;
    if (!fetchPromise) {
      this.setState({
        err: 'no more',
      });
      return;
    }
    this.setState({
      isLoading: more,
      isRefreshing: !more,
    });
    fetchPromise().then(rows => {
      if(rows instanceof Array) {
        let newRows = !more ? [].concat(rows) : this._getRows().concat(rows);
        this._setRows(newRows);
        this.setState({
          isLoading: false,
          isRefreshing: false,
          dataSource: this.state.dataSource.cloneWithRows(newRows),
          nextPage: rows.nextPage,
        });
      }
    }, err => {
      this.setState({
        isLoading: false,
        isRefreshing: false,
        err: err,
      });
    });
  }

  render() {
    let {isLoading, isRefreshing, dataSource, err} = this.state;
    let {renderRow} = this.props;
    return (
      <ListView
        style={[styles.scrollView, this.props.style]}
        dataSource={dataSource}
        enableEmptySections={true}
        removeClippedSubviews={true}
        onEndReached={() => this._onFetch(true)}
        renderRow={renderRow}
        renderHeader={this._renderHeader}
        renderFooter={this._renderFooter}
        scrollRenderAheadDistance={50}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={this._onFetch}
          />
        }
      />
    );
  }
}

let styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 5,
  },
  header: {
    marginTop: 20,
  },
  loadMore: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
  },
  loadMoreText: {
    fontSize: 15,
  },
});
