import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stat from './Stat';


export default class StatsContainer extends Component {
  constructor(props) {
    super(props);
    const { bookId, store } = this.props;
    this.state = { loading: true };
    store.subscribers.push(this);
    this.store = store;
  }

  componentDidMount() {
    this.loadStats();
  }

  loadStats() {
    this.store.setState({ interests: 5, matches: 2, instances: 3 });
    this.setState({ loading: false });
  }

  render() {
    const { interests, matches, instances } = this.store.state;
    const { loading } = this.state;
    return loading
      ? <p className="centered-text">Loading...</p>
      : (
        <React.Fragment>
          <div className="left-container" />
          <div className="right-container">
            <Stat value={interests} relative={interests} name="Interests" />
            <Stat value={matches} relative={matches} name="Exchanges" />
            <Stat value={instances} relative={instances} name="Owners" />
          </div>
        </React.Fragment>
      );
  }
}

StatsContainer.propTypes = {
  bookId: PropTypes.string.isRequired,
  store: PropTypes.shape({}).isRequired,
};
