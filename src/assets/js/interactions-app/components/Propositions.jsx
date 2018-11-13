import React from 'react';
import PropTypes from 'prop-types';
import Proposal from './Proposal';
import Proposition from './Proposition';

export default function Propositions(props) {
  const {
    proposers, proposing, onAccept, onCancel,
  } = props;
  const propositions = proposers.map(
    match => <Proposition match={match} onAccept={onAccept} onCancel={onCancel} key={match.id} />,
  );
  const proposals = proposing.map(
    match => <Proposal match={match} onCancel={onCancel} key={match.id} />,
  );
  const rows = propositions.concat(proposals);
  return (
    <div>
      {(rows.length) ? (
        rows
      ) : (
        <p className="empty-message">No pending matches</p>
      )}
    </div>
  );
}

Propositions.propTypes = {
  proposers: PropTypes.arrayOf(PropTypes.shape({
    proposeeBookInstance: PropTypes.object.isRequired,
    proposerBookInstance: PropTypes.object.isRequired,
  })).isRequired,
  proposing: PropTypes.arrayOf(PropTypes.shape({
    proposeeBookInstance: PropTypes.object.isRequired,
    proposerBookInstance: PropTypes.object.isRequired,
  })).isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
