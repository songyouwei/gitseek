import React, {
  PropTypes,
  Component,
  Dimensions,
  Image,
  InteractionManager,
  Animated,
  StyleSheet,
  View,
  Text,
  Alert,
}  from 'react-native';
import Api from '../Api';
import SearchBarEditable from '../components/SearchBarEditable';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorView from '../components/ErrorView';
import SearchResults from '../components/SearchResults';
import config from '../config';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      keyword: null,
      searchState: null,//'loading','loaded','error'
      results: null,
    };
  }

  onSearch(keyword) {
    if (!keyword) return;
    this.setState({
      keyword: keyword,
      searchState: "loading",
    });
    Api.search(keyword);
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBarEditable onSearch={this.onSearch} />
        {this.state.searchState?
          (this.state.searchState==="loading"?
            <LoadingIndicator style={{marginTop: 100}} />
            :(this.state.searchState==="loaded"?<SearchResults results={this.state.results} />:<ErrorView />)
          )
          :null
        }
      </View>
    );
  }
};
Search.propTypes = {
  loading: PropTypes.bool,
  results: PropTypes.object,
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.backgroundColor,
  },
});
