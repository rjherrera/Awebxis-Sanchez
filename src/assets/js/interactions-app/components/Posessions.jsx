import React from 'react';
import PropTypes from 'prop-types';


function renderPosession(posession) {
  return (
    <div className="card-exchange-container">
      <a className="card-book" href="/">
        <img src={posession.book.imageUrl} alt={posession.book.title} />
        <div className="shadow">
          <p className="title">{posession.book.title}</p>
          <p className="author">{posession.book.author.name}</p>
        </div>
      </a>
    </div>
  );
}

export default function Posessions(props) {
  const { posessions } = props;
  const rows = posessions.map(posession => renderPosession(posession));
  return rows.length ? (
    <div className="cards-container">
      {rows}
    </div>
  ) : (
    <p className="empty-message">You don&apos;t own any book</p>
  );
}

Posessions.propTypes = {
  posessions: PropTypes.arrayOf(PropTypes.shape({
    instance: PropTypes.object.isRequired,
  })).isRequired,
};
