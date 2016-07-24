import React, {Component, PropTypes} from "react";
import {Dimensions, Image, InteractionManager, Animated, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Octicons';
import Avatar from '../components/Avatar';
import StatefulImage from '../components/StatefulImage';
import config from '../config';

export default class FeedItem extends Component {
  static propTypes = {
    feed: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  _getActionIconName(feed: Feed): string {
    let name = 'comment-discussion';
    if (feed.type === 'ForkEvent') {
      name = 'git-branch';
    } else if (feed.type === 'WatchEvent') {
      name = 'star';
    } else if (feed.type === 'PushEvent') {
      name = 'git-commit';
    } else if (feed.type === 'IssueCommentEvent') {
      name = 'comment-discussion';
    } else if (feed.type === 'PullRequestEvent') {
      name = 'git-pull-request';
    } else if (feed.type === 'MemberEvent') {
      name = 'broadcast';
    } else if (feed.type === 'IssuesEvent') {
      let realActoin = feed.payload.action;
      name = 'issue-'+realActoin;
    } else if (feed.type === 'PullRequestReviewCommentEvent') {
      name = 'comment-discussion';
    } else if (feed.type === 'DeleteEvent') {
      name = 'x';
    } else if (feed.type === 'CreateEvent') {
      name = 'repo-push';
    }
    return name;
  }

  _getAction(feed: Feed): string {
    let action = 'started';
    if (feed.type === 'ForkEvent') {
      action = 'forked';
    } else if (feed.type === 'WatchEvent') {
      action = 'started';
    } else if (feed.type === 'PushEvent') {
      let ref = feed.payload.ref.split('/');
      action = 'pushed to branch ' + ref[ref.length-1];
    } else if (feed.type === 'IssueCommentEvent') {
      let realActoin = feed.payload.action;
      action = realActoin + ' comment on'+ ' issue #' + feed.payload.issue.number + ' "' +  feed.payload.issue.title + '" ';
    } else if (feed.type === 'PullRequestEvent') {
      let realActoin = feed.payload.action;
      action = realActoin + ' pull request #' + feed.payload.number + ' "' + feed.payload.pullRequest.title + '" ';
    } else if (feed.type === 'MemberEvent') {
      action = feed.payload.action;
    } else if (feed.type === 'IssuesEvent') {
      let realActoin = feed.payload.action;
      action = realActoin + ' issue ' + '#' + feed.payload.issue.number;
    } else if (feed.type === 'PullRequestReviewCommentEvent') {
      let realActoin = feed.payload.action;
      action = realActoin + ' comment on pull request #' + feed.payload.pullRequest.number + ' "' + feed.payload.pullRequest.title + '"';
    } else if (feed.type === 'DeleteEvent') {
      action = 'deleted ' + feed.payload.refType + ' "' + feed.payload.ref + '" at';
    } else if (feed.type === 'CreateEvent') {
      action = 'created ' + feed.payload.refType + (feed.payload.ref ? ' "' + feed.payload.ref + '" at' : '');
    }
    return action;
  }

  _getDetail(feed: Feed): string {
    let content = "";
    if (feed.type === 'PushEvent') {
      feed.payload.commits.map(commit => content += commit.message);
    } else if (feed.type === 'IssuesEvent') {
      content = feed.payload.issue.title;
    } else if (feed.type === 'IssueCommentEvent' || feed.type === 'PullRequestReviewCommentEvent') {
      content = feed.payload.comment.body;
    } else if (feed.type === 'PullRequestEvent') {
      content = feed.payload.pullRequest.body;
    } else if (feed.type === 'DeleteEvent' || feed.type === 'CreateEvent') {
      content = feed.payload.refType + ' ' + feed.payload.ref;
    }
    return content;
  }

  _getTimeAgo(createdAt): string {
    let current = new Date().getTime();
    let previous = createdAt.getTime();

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;
    elapsed = Math.max(0, elapsed);

    if (elapsed < msPerHour) {
      return Math.round(elapsed/msPerMinute) + ' mins ago';
    }
    else if (elapsed < msPerDay ) {
      return Math.round(elapsed/msPerHour ) + ' hours ago';
    }
    else if (elapsed < msPerMonth) {
      return Math.round(elapsed/msPerDay) + ' days ago';
    }
    else if (elapsed < msPerYear) {
      return Math.round(elapsed/msPerMonth) + ' months ago';
    }
    else {
      return Math.round(elapsed/msPerYear ) + ' years ago';
    }
  }

  _onActorPress(actor) {
    Actions.user({user: actor});
  }

  _onRepoPress(repo) {
    Actions.webPage({
      url: `https://github.com/${repo.name}/blob/master/README.md`,
      title: repo.name,
      repo: repo,
    });
  }

  _onDetailPress(feed) {
    switch (feed.type) {
      case 'PushEvent':
        Actions.webPage({
          url: `https://github.com/${feed.repo.name}/commits/${feed.payload.head}`,
          title: feed.repo.name,
        });
        break;
      case 'IssuesEvent':
        Actions.webPage({
          url: feed.payload.issue.htmlUrl,
          title: feed.repo.name,
        });
        break;
      case 'IssueCommentEvent':
      case 'PullRequestReviewCommentEvent':
        Actions.webPage({
          url: feed.payload.comment.htmlUrl,
          title: feed.repo.name,
        });
        break;
      case 'PullRequestEvent':
        Actions.webPage({
          url: feed.payload.pullRequest.htmlUrl,
          title: feed.repo.name,
        });
        break;
      default:
        Actions.webPage({
          url: `https://github.com/${feed.repo.name}/blob/master/README.md`,
          title: feed.repo.name,
        });
        break;
    }
  }

  render() {
    let feed = this.props.feed;
    let {id, actor, createdAt, payload, repo, type} = feed;
    let action = this._getAction(feed);
    let detail = this._getDetail(feed);
    let timeAgo = this._getTimeAgo(createdAt);
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.left}>
          <Avatar style={styles.avatar} url={actor.avatarUrl} size={56} onPress={() => this._onActorPress(actor)} />
          <View style={styles.actionIcon}>
            <Icon name={this._getActionIconName(feed)} size={25} color="#666" />
          </View>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={() => this._onActorPress(actor)}>
            <Text style={styles.login}>{actor.login}</Text>
          </TouchableOpacity>
          <Text style={styles.action}>{action}</Text>
          <TouchableOpacity onPress={() => this._onRepoPress(repo)}>
            <Text style={styles.repo}>{repo.name}</Text>
          </TouchableOpacity>
          {detail
            ?
            <TouchableOpacity style={styles.detailWrapper} onPress={() => this._onDetailPress(feed)}>
              <Text style={styles.detail} numberOfLines={15}>{detail}</Text>
            </TouchableOpacity>
            :
            null
          }
          <Text style={styles.time}>{timeAgo}</Text>
        </View>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginTop: 20,
    backgroundColor: '#fafafa',
  },
  left: {
    padding: 5,
  },
  avatar: {
  },
  actionIcon: {
    marginTop: 5,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    marginLeft: 10,
  },
  login: {
    color: config.linkColor,
    fontWeight: '400',
    fontSize: 15,
  },
  action: {
    fontWeight: '400',
    marginTop: 5,
    fontSize: 13,
    color: 'grey',
  },
  repo: {
    color: config.linkColor,
    marginTop: 5,
    fontWeight: '400',
  },
  detailWrapper: {
    marginTop: 10,
    marginRight: 10,
    borderStyle: 'dashed',
    backgroundColor: config.backgroundColor,
  },
  detail: {
    fontSize: 13,
    padding: 5,
  },
  time: {
    fontSize: 12,
    color: 'grey',
    marginTop: 10,
  },
});
