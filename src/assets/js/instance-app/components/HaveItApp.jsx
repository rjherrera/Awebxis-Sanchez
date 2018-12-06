import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import HaveIt from './HaveIt';


function HaveItApp({ serverData }) {
  return (
    <HaveIt
      username={String(serverData.username)}
      bookId={String(serverData.bookId)}
      bookInstancePath={String(serverData.bookInstancePath)}
    />
  );
}

HaveItApp.propTypes = {
  serverData: PropTypes.shape({
    // instanceId: PropTypes.string,
    // bookId: PropTypes.string.isRequired,
  }).isRequired,
};

export default hot(module)(HaveItApp);
