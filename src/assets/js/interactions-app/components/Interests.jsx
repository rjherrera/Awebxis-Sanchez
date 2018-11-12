import React from 'react';
import PropTypes from 'prop-types';
import { buildBookPath } from '../services/books';


function renderInterest(interest) {
  return (
    <div className="card-exchange-container">
      <a className="card-book" href={buildBookPath(interest.book)}>
        <img src={interest.book.imageUrl} alt={interest.book.title} />
        <div className="shadow">
          <p className="title">{interest.book.title}</p>
          <p className="author">{interest.book.author.name}</p>
        </div>
      </a>
    </div>
  );
}

export default function Interests(props) {
  const { interests } = props;
  const rows = interests.map(interest => renderInterest(interest));
  return rows.length ? (
    <div className="cards-container">
      {rows}
    </div>
  ) : (
    <p className="empty-message">You haven&apos;t shown interest in any book</p>
  );
}

Interests.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.shape({
    interest: PropTypes.object.isRequired,
  })).isRequired,
};
