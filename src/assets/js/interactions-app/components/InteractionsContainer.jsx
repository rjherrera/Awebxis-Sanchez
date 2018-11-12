import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchProposers, fetchProposing, acceptMatch, cancelMatch } from '../services/propositions';
import { fetchPosessions } from '../services/posessions';
import { fetchInterests, fetchOthersInterests } from '../services/interests';
import OthersInterests from './OthersInterests';
import Propositions from './Propositions';
import Posessions from './Posessions';
import Interests from './Interests';

export default class InteractionsContainer extends Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      proposers: [],
      proposing: [],
      posessions: [],
      interests: [],
      othersInterests: [],
    };
  }

  componentDidMount() {
    this.loadProposers();
    this.loadProposing();
    this.loadPosessions();
    this.loadInterests();
    this.loadOthersInterests();
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

  async loadInterests() {
    const { username } = this.props;
    const interests = await fetchInterests(username);
    this.setState({ interests });
  }

  async loadOthersInterests() {
    const { currentUsername } = this.props;
    const othersInterests = await fetchOthersInterests(currentUsername);
    this.setState({ othersInterests });
  }

  async loadPosessions() {
    const { username } = this.props;
    const posessions = await fetchPosessions(username);
    this.setState({ posessions });
  }

  async handleAccept(match) {
    await acceptMatch(match);
    this.loadProposing();
    this.loadProposers();
    this.loadPosessions();
    this.loadOthersInterests();
  }

  async handleCancel(match) {
    await cancelMatch(match);
    this.loadProposing();
    this.loadProposers();
  }

  render() {
    const { currentUsername, username } = this.props;
    const { proposers, proposing, posessions, interests, othersInterests } = this.state;
    return (
      <div>
        <div className="flex-row">
          <div className="flex-column quadrant1 flex-top">
            <h1>Pending proposals</h1>
            <Propositions
              proposers={proposers}
              proposing={proposing}
              onAccept={this.handleAccept}
              onCancel={this.handleCancel}
            />
          </div>
          <div className="flex-column quadrant2 flex-top">
            <h1>People looking for your books</h1>
            <OthersInterests instances={othersInterests} />
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-column quadrant3 flex-top">
            <h1>{ currentUsername === username ? 'Want' : 'Wants' }</h1>
            <Interests interests={interests} />
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
