import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, TextInput, View, Image, Dimensions, TouchableOpacity, Platform} from "react-native";
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Octicons';
import Api from '../Api';
import config from '../config';

const styles = StyleSheet.create({
  container: {

  },
  searchBar: {
    flexDirection: 'row',
    paddingTop: Platform.OS==='ios'?26:6,
    paddingBottom: 6,
    backgroundColor: config.barColor,
    alignItems: "center",
  },
  search: {
    height: 32,
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: config.backgroundColor,
  },
  searchIcon: {
    marginLeft: 10,
    marginRight: 13,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
  },
  cancel: {
    marginRight: 15,
    marginLeft: 15,
  },
  cancelText: {
    fontSize: 15,
    color: config.themeColor,
  },
  history: {
  },
  historyItem: {
    marginTop: 16,
    marginLeft: 20,
  },
  historyItemText: {
    fontSize: 13,
  },
  clear: {
    marginTop: 16,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,//divider
    borderTopColor: '#ddd',
    borderBottomWidth: 1,//divider
    borderBottomColor: '#ddd',
  },
  clearText: {
    fontSize: 15,
    color: config.themeColor,
  },
});

export default class SearchBarEditable extends Component {

  static propTypes = {
  	onSearch: PropTypes.func,
  };
  
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onHistoryItemPress = this.onHistoryItemPress.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      keyword: null,
      showHistory: true,
      historyWords: [],
    };
  }

  componentWillMount() {
    Api.getSearchHistorys().then(history => {
      history instanceof Array && this.setState({historyWords: history});
    });
  }

  onCancel() {
    this.refs.textInput.blur();
    Actions.pop();
  }

  onSearch(keyword) {
    this.props.onSearch(keyword);
    this.refs.textInput.blur();
    this.setState({showHistory: false});
  }

  onHistoryItemPress(e) {
    let index = parseInt(e.dispatchMarker.substr(e.dispatchMarker.length-1,e.dispatchMarker.length));
    let keyword = this.state.historyWords[index];
    this.setState({keyword: keyword});
    this.onSearch(keyword);
  }

  onClear() {
    this.setState({showHistory: false});
    Api.clearSearchHistorys();
  }

  onFocus() {
    Api.getSearchHistorys().then(history => {
      history instanceof Array && this.setState({historyWords: history});
    });
  }

  render() {
    let {historyWords} = this.state;
    let historyItems = [];
    for (let i = historyWords.length-1; i >=0 ; i--) {
      var keyword = historyWords[i];
      historyItems.push(
        <TouchableOpacity style={styles.historyItem} onPress={this.onHistoryItemPress} key={i} >
          <Text style={styles.historyItemText}>{keyword}</Text>
        </TouchableOpacity>
      );
    }
    return (
  		<View style={[styles.container, this.props.style]}>
        <View style={styles.searchBar}>
          <View style={styles.search}>
            <Icon style={styles.searchIcon} name="search" size={17} />
            <TextInput
              ref="textInput"
              style={styles.textInput}
              autoFocus={true}
              returnKeyType="search"
              onChangeText={(text) => this.setState({keyword: text})}
              onSubmitEditing={()=>this.onSearch(this.state.keyword)}
              onFocus={this.onFocus}
              onBlur={()=>{this.setState({showHistory:false})}}
              value={this.state.keyword}
            />
          </View>
          <TouchableOpacity style={styles.cancel} onPress={this.onCancel}>
            <Text style={styles.cancelText}>cancel</Text>
          </TouchableOpacity>
        </View>
        {this.state.showHistory&&historyWords.length>0?
          <View style={styles.history}>
            {historyItems}
            <TouchableOpacity style={styles.clear} onPress={this.onClear}>
              <Text style={styles.clearText}>clear search history</Text>
            </TouchableOpacity>
          </View>
          :null
        }
      </View>
    );
  }
}
