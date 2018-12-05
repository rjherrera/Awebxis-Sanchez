import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import WantIt from './WantIt';


function WantItApp({ serverData }) {
  return (
    <WantIt
      username={serverData.username}
      bookId={serverData.bookId}
    />
  );
}

WantItApp.propTypes = {
  serverData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    bookId: PropTypes.string.isRequired,
  }).isRequired,
};

export default hot(module)(WantItApp);
