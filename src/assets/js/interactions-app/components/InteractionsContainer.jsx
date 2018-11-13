import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  fetchProposers,
  fetchProposing,
  acceptMatch,
  cancelMatch,
  proposeExchange,
} from '../services/propositions';
import { fetchPosessions } from '../services/posessions';
import { fetchInterests, fetchOthersInterests } from '../services/interests';
import OthersInterests from './OthersInterests';
import Propositions from './Propositions';
import Posessions from './Posessions';
import Interests from './Interests';
import Notification from '../../notification/components/Notification';
import { buildBookPath } from '../services/books';

function bookAnchor(book) {
  return (
    <a className="bolded" href={buildBookPath(book)}>
      {book.title}
    </a>
  );
}

export default class InteractionsContainer extends Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePropose = this.handlePropose.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.state = {
      proposers: [],
      proposing: [],
      posessions: [],
      currentPosessions: [],
      interests: [],
      othersInterests: [],
      notificationText: null,
      notificationType: null,
    };
  }

  componentDidMount() {
    this.loadProposers();
    this.loadProposing();
    this.loadPosessions();
    this.loadCurrentPosessions();
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

  async loadCurrentPosessions() {
    const { currentUsername } = this.props;
    const currentPosessions = await fetchPosessions(currentUsername);
    this.setState({ currentPosessions });
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

  async handlePropose(e, proposerInstanceId, proposeeInstanceId) {
    e.preventDefault();
    if (proposerInstanceId === null) {
      this.setState({
        notificationText: 'Please select a book to offer in exchange',
        notificationType: 'negative',
      });
    } else {
      const { match } = await proposeExchange(proposerInstanceId, proposeeInstanceId);
      const proposerBook = match.proposerBookInstance.book;
      const proposeeBook = match.proposeeBookInstance.book;
      this.setState({
        notificationText:
  <span>
    You&apos;re offering&nbsp;
    {bookAnchor(proposerBook)}
    &nbsp;for&nbsp;
    {bookAnchor(proposeeBook)}
  </span>,
        notificationType: 'positive',
      });
      this.loadProposing();
    }
  }

  handleDismiss() {
    this.setState({ notificationText: null, notificationType: null });
  }

  render() {
    const { currentUsername, username } = this.props;
    const isSelf = currentUsername === username;
    const {
      proposers,
      proposing,
      posessions,
      currentPosessions,
      interests,
      othersInterests,
      notificationText,
      notificationType,
    } = this.state;
    return (
      <div>
        {
          notificationText
          && (
          <Notification
            text={notificationText}
            type={notificationType}
            onDismiss={this.handleDismiss}
          />
          )
        }
        {
          isSelf
          && (
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
          )
        }
        <div className="flex-row">
          <div className="flex-column quadrant3 flex-top">
            <h1>{isSelf ? 'Want' : 'Wants'}</h1>
            <Interests interests={interests} />
          </div>
          <div className="flex-column quadrant4 flex-top">
            <h1>{isSelf ? 'Own' : 'Owns'}</h1>
            <Posessions
              posessions={posessions}
              currentPosessions={currentPosessions}
              isSelf={isSelf}
              onPropose={this.handlePropose}
            />
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
