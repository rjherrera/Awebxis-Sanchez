import React from 'react';
import PropTypes from 'prop-types';
import { buildBookPath } from '../services/books';

export default function Interest(props) {
  const { interest } = props;
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

Interest.propTypes = {
  interest: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
