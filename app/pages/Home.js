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
}  from 'react-native';
import {Actions} from 'react-native-router-flux';
import Api from '../Api';
import ErrorView from '../components/ErrorView';
import SearchBar from '../components/SearchBar';
import FeedItem from '../components/FeedItem';
import config from '../config';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this._fetchData = this._fetchData.bind(this);
    this.state = {
      isLoading: true,
      results: [],
      err: null,
    };
  }

  componentDidMount() {
    //set timeout to fix a refresh state problem
    setTimeout(this._fetchData, 0);
  }

  _fetchData() {
    this.setState({
      isLoading: true,
    });
    Api.getFeeds().then(res => {
      this.setState({
        isLoading: false,
        results: res,
      });
    }, err => {
      this.setState({
        isLoading: false,
        err: err,
      });
    });
  }

  render() {
    let {isLoading, results, err} = this.state;
    let items = [];
    results && results instanceof Array && results.map(feed => {
      items.push(
        <FeedItem feed={feed} key={feed.id} />
      );
    });
    return (
      <View style={styles.container}>
        <SearchBar onPress={()=>Actions.search()} />
        {
          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={this._fetchData}
              />
            }>
            {
              !err && results
              ?(items.length>0?items:null)
              :<ErrorView msg={err} />
            }
          </ScrollView>
        }
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
});
