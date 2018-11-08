import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import FollowsContainer from './FollowsContainer';
import FollowButton from './FollowButton';

function FollowsApp({ serverData }) {
  return (
    <div>
      <FollowsContainer
        username={serverData.username}
      />
      <FollowButton
        currentUsername={serverData.currentUsername}
        username={serverData.username}
      />
    </div>
  );
}

FollowsApp.propTypes = {
  serverData: PropTypes.shape({
    currentUsername: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default hot(module)(FollowsApp);
