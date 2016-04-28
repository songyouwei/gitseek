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

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let results = this.props.results;
    console.log(results);
    let items = [];
    // if(results) results.map((result)=>{
    //   items.push(
    //   );
    // });
    if (results.length>0) {
      return (
        <ScrollView>
          {items}
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.none}>
          <Text style={styles.noneText}>抱歉，没找到相关内容</Text>
        </View>
      );
    }
  }
};
SearchResults.propTypes = {
  results: PropTypes.array,
};

let styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#343739',
  },
  coverImg: {
    width: 160,
    height: 120,
  },
  info: {
    flex: 1,
    height: 120,
    marginLeft: 12,
    marginBottom: 4,
  },
  titleText: {
    flex: 1,
    fontSize: 17,
    color: '#fff',
  },
  more: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  authorText: {
    fontSize: 15,
    color: '#fff',
  },
  statistics: {
    flexDirection: 'row',
    marginTop: 11,
  },
  statisticsItem: {
    flex: 1,
    flexDirection: 'row',
  },
  statisticsIcon: {
    width: 12.5,
    height: 12.5,
    marginRight: 8,
  },
  statisticsText: {
    fontSize: 12,
    color: '#fff',
  },
  none: {
    alignItems: 'center',
    marginTop: 89,
  },
  noneIcon: {
    width: 140,
    height: 139,
    marginBottom: 66,
  },
  noneText: {
    fontSize: 18,
    color: '#fff',
  },
});
