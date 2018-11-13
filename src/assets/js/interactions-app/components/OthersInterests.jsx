import React from 'react';
import PropTypes from 'prop-types';

function renderInstance(instance) {
  const interestsCount = instance.book.interests.length;
  const people = interestsCount === 1 ? 'user' : 'users';
  return (
    <li key={instance.id}>
      {instance.book.title}
      <span className="interest-count">
        {` - ${interestsCount} ${people} interested`}
      </span>
    </li>
  );
}

export default function OthersInterests(props) {
  const { instances } = props;
  const rows = instances.map(instance => renderInstance(instance));
  return rows.length ? (
    <ul>
      {rows}
    </ul>
  ) : (
    <p className="empty-message">You don&apos;t own any book</p>
  );
}

OthersInterests.propTypes = {
  instances: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};
