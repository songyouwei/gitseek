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
  TouchableOpacity,
}  from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Avator from '../components/Avator';
import StatefulImage from '../components/StatefulImage';

export default class FeedItem extends Component {
  static propTypes = {
    feed: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {id, actor, createAt, payload, repo, type} = this.props.feed;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.left}>
          <Avator style={styles.avator} url={actor.avatarUrl} size={30} />
          <Icon style={styles.actionIcon} name="comment" size={25} />
        </View>
        <View style={styles.right}>
          <Text>{actor.login}</Text>
          <Text>{payload.action}</Text>
          <Text>{repo.name}</Text>
          <Text>{createAt}</Text>
          <Text>{payload.issue && payload.issue.title}</Text>
        </View>
      </View>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avator: {

  }
});
