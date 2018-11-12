import React from 'react';
import PropTypes from 'prop-types';
import { buildBookPath } from '../services/books';

function bookAnchor(book) {
  return (
    <a className="bolded" href={buildBookPath(book)}>
      { book.title }
    </a>
  );
}

function proposition(match) {
  const { proposerBookInstance, proposeeBookInstance } = match;
  return (
    <li>
      You&apos;re being offered&nbsp;
      { bookAnchor(proposerBookInstance.book) }
      &nbsp;for your book&nbsp;
      { bookAnchor(proposeeBookInstance.book) }
    </li>
  );
}

function proposal(match) {
  const { proposerBookInstance, proposeeBookInstance } = match;
  return (
    <li>
      You&apos;re offering&nbsp;
      { bookAnchor(proposerBookInstance.book) }
      &nbsp;for&nbsp;
      { bookAnchor(proposeeBookInstance.book) }
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
