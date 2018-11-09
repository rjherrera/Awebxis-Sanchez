import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import HaveIt from './HaveIt';


function RootHaveIt({ serverData }) {
  return (
    <div><HaveIt username={String(serverData.username)} instanceId={Number(serverData.instanceId)} bookId={String(serverData.bookId)} bookInstancePath={String(serverData.bookInstancePath)} /></div>
  );
}

RootHaveIt.propTypes = {
  serverData: PropTypes.shape({
    // instanceId: PropTypes.string,
    // bookId: PropTypes.string.isRequired,
  }).isRequired,
};

export default hot(module)(RootHaveIt);
