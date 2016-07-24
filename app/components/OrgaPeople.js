import React, {Component, PropTypes} from "react";
import UserItem from '../components/UserItem';
import XListView from '../components/XListView';
import Api from '../Api';

export default class OrgaPeople extends Component {
  static propTypes = {
    orga: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this._renderPeople = this._renderPeople.bind(this);
  }

  _renderPeople(people) {
    return <UserItem user={people} />;
  }

  render() {
    return (
      <XListView
        style={{flex: 1}}
        onFetch={{func: Api.getOrgaPeople, args: [this.props.orga]}}
        renderRow={this._renderPeople}
      />
    );
  }
}
