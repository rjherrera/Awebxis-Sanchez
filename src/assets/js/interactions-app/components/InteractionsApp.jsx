import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import InteractionsContainer from './InteractionsContainer';

function InteractionsApp({ serverData }) {
  return (
    <InteractionsContainer
      username={serverData.username}
      currentUsername={serverData.currentUsername}
    />
  );
}

InteractionsApp.propTypes = {
  serverData: PropTypes.shape({
    currentUsername: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default hot(module)(InteractionsApp);
