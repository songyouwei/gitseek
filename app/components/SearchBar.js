import React, {
  PropTypes,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import config from '../config';

export default class SearchBar extends Component {
  render() {
    return (
  		<View style={[styles.container, this.props.style]}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.search}>
            <Icon style={styles.searchIcon} name="search" size={17} color="#000" />
            <Text style={styles.tintText}>search repos</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};
SearchBar.propTypes = {
	onPress: PropTypes.func,
};

let styles = StyleSheet.create({
  container: {
  	paddingTop: Platform.OS==='ios'?26:6,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
  	backgroundColor: config.barColor,
  },
  search: {
    height: 32,
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: config.backgroundColor,
  },
  searchIcon: {
    marginRight: 5,
  },
  tintText: {
  	textAlign: "center",
  	fontSize: 18,
  	color: "#000",
  },
});
