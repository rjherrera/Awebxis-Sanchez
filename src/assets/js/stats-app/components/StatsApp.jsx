import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import StatsContainer from './StatsContainer';

function StatsApp({ serverData, store }) {
  return (
    <StatsContainer bookIsbn={serverData.bookIsbn} store={store} />
  );
}

StatsApp.propTypes = {
  serverData: PropTypes.shape({
    bookIsbn: PropTypes.string.isRequired,
  }).isRequired,
  store: PropTypes.shape({}).isRequired,
};

export default hot(module)(StatsApp);
