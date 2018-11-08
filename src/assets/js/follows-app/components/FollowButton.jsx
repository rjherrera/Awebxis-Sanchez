import React, { Component } from 'react';
import { fetchFollow, followUser, unfollowUser } from '../services/follows';

export default class FollowButton extends Component {
  constructor(props) {
    super(props);
    this.toogleFollow = this.toogleFollow.bind(this);
    this.state = { isFollowing: false };
  }

  componentDidMount() {
    this.loadFollow();
  }

  async loadFollow() {
    const { currentUsername, username } = this.props;
    const follow = await fetchFollow(currentUsername, username);
    this.setState({ isFollowing: !!follow });
  }

  async toogleFollow() {
    const { currentUsername, username } = this.props;
    const { isFollowing } = this.state;
    if (isFollowing) {
      const result = await unfollowUser(currentUsername, username);
      this.setState({ isFollowing: !!result });
    } else {
      const result = await followUser(currentUsername, username);
      this.setState({ isFollowing: !!result });
    }
  }

  render() {
    const { isFollowing } = this.state;
    return (
      <button type="submit" onClick={this.toogleFollow}>
        {
          isFollowing ? 'Unfollow' : 'Follow'
        }
      </button>
    );
  }
}
