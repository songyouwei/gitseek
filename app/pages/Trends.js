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
import config from '../config';

export default class Trends extends Component {

  constructor(props) {
    super(props);
    this._fetchData = this._fetchData.bind(this);
    this.state = {
      isLoading: true,
      results: [],
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._fetchData();
    });
  }

  _fetchData() {
    this.setState({
      isLoading: true,
    });
    // Api.getHome().;
  }

  render() {
    let {isLoading, results} = this.state;
    let tagSlides = [];
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this.fetchData}
            />
          }>
          {
            results
            ?(tagSlides.length>0?tagSlides:null)
            :<ErrorView />
          }
        </ScrollView>
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
    padding: 10,
  },
});
