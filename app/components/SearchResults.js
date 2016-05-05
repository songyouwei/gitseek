import React, {
  PropTypes,
  Component,
  Dimensions,
  TouchableOpacity,
  Image,
  InteractionManager,
  Animated,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Platform,
}  from 'react-native';
import {Actions} from 'react-native-router-flux';
import RepoItem from './RepoItem';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let results = this.props.results;
    let items = [];
    !(results instanceof Array) && (results = results.items);
    results && results instanceof Array && results.map(repo => {
      items.push(
        <RepoItem repo={repo} key={repo.id} />
      );
    });
    if (results.length>0) {
      return (
        <ScrollView style={styles.scrollView}>
          {items}
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.none}>
          <Text style={styles.noneText}>Sorry, nothing match with this keyword</Text>
        </View>
      );
    }
  }
};
SearchResults.propTypes = {
  results: PropTypes.any,
};

let styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 5,
  },
  none: {
    alignItems: 'center',
    marginTop: 89,
  },
  noneText: {
    fontSize: 18,
  },
});
