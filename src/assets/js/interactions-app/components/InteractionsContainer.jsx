import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchProposers, fetchProposing } from '../services/propositions';
import { fetchPosessions } from '../services/posessions';
import { fetchOwnInterests } from '../services/interests';
// import OthersInterests from './OthersInterests';
import Propositions from './Propositions';
import Posessions from './Posessions';
import OwnInterests from './OwnInterests';

export default class InteractionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { proposers: [], proposing: [], posessions: [], interests: [] };
  }

  componentDidMount() {
    this.loadProposers();
    this.loadProposing();
    this.loadPosessions();
    this.loadOwnInterests();
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

  async loadOwnInterests() {
    const { currentUsername } = this.props;
    const interests = await fetchOwnInterests(currentUsername);
    this.setState({ interests });
  }

  async loadPosessions() {
    const { currentUsername } = this.props;
    const posessions = await fetchPosessions(currentUsername);
    this.setState({ posessions });
  }

  render() {
    const { currentUsername, username } = this.props;
    const { proposers, proposing, posessions, interests } = this.state;
    return (
      <div>
        <div className="flex-row">
          <div className="flex-column quadrant1 flex-top">
            <h1>Pending proposals</h1>
            <Propositions proposers={proposers} proposing={proposing} />
          </div>
          <div className="flex-column quadrant2 flex-top">
            <h1>People looking for your books</h1>
            {/* <OthersInterests /> */}
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-column quadrant3 flex-top">
            <h1>{ currentUsername === username ? 'Want' : 'Wants' }</h1>
            <OwnInterests interests={interests} />
          </div>
          <div className="flex-column quadrant4 flex-top">
            <h1>{ currentUsername === username ? 'Own' : 'Owns' }</h1>
            <Posessions posessions={posessions} />
          </div>
        </div>
      </div>
    );
  }
}

InteractionsContainer.propTypes = {
  currentUsername: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
