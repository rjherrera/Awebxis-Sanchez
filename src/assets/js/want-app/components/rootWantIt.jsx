import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import WantIt from './WantIt';


function RootWantIt({ serverData }) {
  return (
    <div><WantIt username={String(serverData.username)} bookId={String(serverData.bookId)} interestPath={String(serverData.interestPath)} /></div>
  );
}

RootWantIt.propTypes = {
  serverData: PropTypes.shape({
    // instanceId: PropTypes.string,
    // bookId: PropTypes.string.isRequired,
  }).isRequired,
};

export default hot(module)(RootWantIt);
