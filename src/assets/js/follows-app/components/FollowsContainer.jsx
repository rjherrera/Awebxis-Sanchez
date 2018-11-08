import React, { Component } from 'react';
import { fetchFollowers, fetchFollowing } from '../services/follows';
import Stats from './Stats';

export default class FollowsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { followers: [], following: [] };
  }

  componentDidMount() {
    this.loadFollows();
  }

  async loadFollows() {
    const { username } = this.props;
    const followers = await fetchFollowers(username);
    const following = await fetchFollowing(username);
    this.setState({ followers, following });
  }

  render() {
    const { followers, following } = this.state;
    return <Stats followers={followers} following={following} />;
  }
}
