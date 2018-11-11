import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  fetchProposers,
  fetchProposing,
} from '../services/propositions';
// import OthersInterests from './OthersInterests';
import Propositions from './Propositions';
// import Posessions from './Posessions';
// import OwnInterests from './OwnInterests';

export default class InteractionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { proposers: [], proposing: [] };
  }

  componentDidMount() {
    this.loadProposers();
    this.loadProposing();
  }

  async loadProposers() {
    const { currentUsername } = this.props;
    const proposers = await fetchProposers(currentUsername);
    this.setState({ proposers });
  }

  async loadProposing() {
    const { currentUsername } = this.props;
    const proposing = await fetchProposing(currentUsername);
    this.setState({ proposing });
  }

  render() {
    const { proposers, proposing } = this.state;
    return (
      <div className="flex-row">
        <div className="flex-column quadrant1 flex-top">
          <h1>Pending proposals</h1>
          <Propositions proposers={proposers} proposing={proposing} />
        </div>
        <div className="flex-column quadrant2 flex-top">
          {/* <OthersInterests /> */}
        </div>
        <div>
          {/* <Posessions /> */}
          {/* <OwnInterests /> */}
        </div>
      </div>
    );
  }
}

InteractionsContainer.propTypes = {
  currentUsername: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
