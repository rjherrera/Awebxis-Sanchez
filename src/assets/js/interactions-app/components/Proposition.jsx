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

export default function Proposition(props) {
  const { match, onAccept, onCancel } = props;
  const { proposerBookInstance, proposeeBookInstance } = match;
  return (
    <div>
      <li>
        You&apos;re being offered&nbsp;
        {bookAnchor(proposerBookInstance.book)}
        &nbsp;for your book&nbsp;
        {bookAnchor(proposeeBookInstance.book)}
      </li>
      <div className="flex-row">
        <div className="flex-column">
          <button className="button secondary" type="submit" onClick={() => onAccept(match)}>Accept</button>
        </div>
        <div className="flex-column">
          <button className="button negative" type="submit" onClick={() => onCancel(match)}>Refuse</button>
        </div>
      </div>
    </div>
  );
}

Proposition.propTypes = {
  match: PropTypes.shape({
    proposeeBookInstance: PropTypes.object.isRequired,
    proposerBookInstance: PropTypes.object.isRequired,
  }).isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
