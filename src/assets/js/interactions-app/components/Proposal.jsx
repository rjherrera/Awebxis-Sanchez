import React from 'react';
import PropTypes from 'prop-types';
import { buildBookPath } from '../services/books';

function bookAnchor(book) {
  return (
    <a className="bolded" href={buildBookPath(book)}>
      {book.title}
    </a>
  );
}

export default function Proposal(props) {
  const { match, onCancel } = props;
  const { proposerBookInstance, proposeeBookInstance } = match;
  return (
    <div>
      <li>
        You&apos;re offering&nbsp;
        {bookAnchor(proposerBookInstance.book)}
        &nbsp;for&nbsp;
        {bookAnchor(proposeeBookInstance.book)}
      </li>
      <div className="flex-row">
        <div className="flex-column">
          <button className="button negative" type="submit" onClick={() => onCancel(match)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

Proposal.propTypes = {
  match: PropTypes.shape({
    proposeeBookInstance: PropTypes.object.isRequired,
    proposerBookInstance: PropTypes.object.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
