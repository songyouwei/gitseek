import React, {Component, PropTypes} from "react";
import XListView from '../components/XListView';
import UserRepoItem from '../components/UserRepoItem';
import Api from '../Api';

export default class UserRepos extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._renderUserRepo = this._renderUserRepo.bind(this);
  }

  _renderUserRepo(repo) {
    return <UserRepoItem repo={repo} />;
  }

  render() {
    return (
      <XListView
        style={{flex: 1}}
        onFetch={{func: () => Api.getUserRepos(this.props.user && this.props.user.login)}}
        renderRow={this._renderUserRepo}
      />
    );
  }
}
