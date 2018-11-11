import React from 'react';
import PropTypes from 'prop-types';

function proposition(match) {
  const { proposerBookInstance, proposeeBookInstance } = match;
  return (
    <li>
      You&apos;re being offered&nbsp;
      <a className="bolded" href="/">{ proposerBookInstance.book.title }</a>
      &nbsp;for your book&nbsp;
      <a className="bolded" href="/">{ proposeeBookInstance.book.title }</a>
    </li>
  );
}

function proposal(match) {
  const { proposerBookInstance, proposeeBookInstance } = match;
  return (
    <li>
      You&apos;re offering&nbsp;
      <a className="bolded" href="/">{ proposerBookInstance.book.title }</a>
      &nbsp;for&nbsp;
      <a className="bolded" href="/">{ proposeeBookInstance.book.title }</a>
    </li>
  );
}

export default function Propositions(props) {
  const { proposers, proposing } = props;
  const propositions = proposers.map(match => proposition(match));
  const proposals = proposing.map(match => proposal(match));
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
};
