import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import StatsContainer from './StatsContainer';

function StatsApp({ serverData, store }) {
  return (
    <StatsContainer bookId={serverData.bookId} store={store} />
  );
}

StatsApp.propTypes = {
  serverData: PropTypes.shape({
    bookId: PropTypes.string.isRequired,
  }).isRequired,
};

export default hot(module)(StatsApp);
