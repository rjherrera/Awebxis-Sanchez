import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import HaveIt from './HaveIt';


function RootHaveIt({ serverData }) {
  return (
    <div><HaveIt instanceId={Number(serverData.instanceId)} bookId={Number(serverData.bookId)} bookInstancePath={String(serverData.bookInstancePath)} /></div>
  );
}

RootHaveIt.propTypes = {
  serverData: PropTypes.shape({
    instanceId: PropTypes.string,
    bookId: PropTypes.string.isRequired,
  }).isRequired,
};

export default hot(module)(RootHaveIt);
