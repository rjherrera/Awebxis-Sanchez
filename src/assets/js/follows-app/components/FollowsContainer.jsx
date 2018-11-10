import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  fetchFollowers,
  fetchFollowing,
  fetchFollow,
  followUser,
  unfollowUser,
} from '../services/follows';
import Stats from './Stats';
import FollowButton from './FollowButton';

export default class FollowsContainer extends Component {
  constructor(props) {
    super(props);
    this.toogleFollow = this.toogleFollow.bind(this);
    this.state = { followers: [], following: [], isFollowing: false };
  }

  componentDidMount() {
    this.loadFollowers();
    this.loadFollowing();
    this.loadFollow();
  }

  async loadFollowers() {
    const { username } = this.props;
    const followers = await fetchFollowers(username);
    this.setState({ followers });
  }

  async loadFollowing() {
    const { username } = this.props;
    const following = await fetchFollowing(username);
    this.setState({ following });
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
    this.loadFollowers();
  }

  render() {
    const { currentUsername, username } = this.props;
    const { followers, following, isFollowing } = this.state;
    return (
      <div>
        <Stats followers={followers} following={following} />
        {
          currentUsername !== username
          && <FollowButton toogleFollow={this.toogleFollow} isFollowing={isFollowing} />
        }
      </div>
    );
  }
}

FollowsContainer.propTypes = {
  currentUsername: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
