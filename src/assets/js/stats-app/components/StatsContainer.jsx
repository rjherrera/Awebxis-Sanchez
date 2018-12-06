import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stat from './Stat';
import fetchStats from '../services/stats';


export default class StatsContainer extends Component {
  constructor(props) {
    super(props);
    const { bookIsbn, store } = this.props;
    this.state = { bookIsbn, loading: true };
    store.subscribers.push(this);
    this.store = store;
  }

  componentDidMount() {
    this.loadStats();
  }

  async loadStats() {
    const { bookIsbn } = this.state;
    const {
      interestsCount,
      interestsMaxCount,
      matchesCount,
      matchesMaxCount,
      instancesCount,
      instancesMaxCount,
    } = await fetchStats(bookIsbn);
    this.store.setState({
      interests: interestsCount, matches: matchesCount, instances: instancesCount,
    });
    this.setState({
      interestsMaxCount, matchesMaxCount, instancesMaxCount, loading: false,
    });
  }

  relativeStats() {
    const { interests, matches, instances } = this.store.state;
    const { interestsMaxCount, matchesMaxCount, instancesMaxCount } = this.state;
    const relativize = (n, t) => Math.min(parseInt(n / t * 100, 10), 100);
    const interestsRelative = relativize(interests, interestsMaxCount);
    const matchesRelative = relativize(matches, matchesMaxCount);
    const instancesRelative = relativize(instances, instancesMaxCount);
    return { interestsRelative, matchesRelative, instancesRelative };
  }

  render() {
    const { interests, matches, instances } = this.store.state;
    const { interestsRelative, matchesRelative, instancesRelative } = this.relativeStats();
    const { loading } = this.state;
    return loading
      ? <p className="centered-text">Loading...</p>
      : (
        <React.Fragment>
          <div className="left-container" />
          <div className="right-container">
            <Stat value={interests} relative={interestsRelative} name="Interests" />
            <Stat value={matches} relative={matchesRelative} name="Exchanges" />
            <Stat value={instances} relative={instancesRelative} name="Owners" />
          </div>
        </React.Fragment>
      );
  }
}

StatsContainer.propTypes = {
  bookIsbn: PropTypes.string.isRequired,
  store: PropTypes.shape({}).isRequired,
};
