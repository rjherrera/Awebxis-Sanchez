import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import FollowsContainer from './FollowsContainer';

function FollowsApp({ serverData }) {
  return (
    <FollowsContainer
      username={serverData.username}
      currentUsername={serverData.currentUsername}
    />
  );
}

FollowsApp.propTypes = {
  serverData: PropTypes.shape({
    currentUsername: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default hot(module)(FollowsApp);
