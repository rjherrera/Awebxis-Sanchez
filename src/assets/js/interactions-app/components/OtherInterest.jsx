import React from 'react';
import PropTypes from 'prop-types';

export default function OtherInterest(props) {
  const { instance } = props;
  const interestsCount = instance.book.interests.length;
  const people = interestsCount === 1 ? 'user' : 'users';
  return (
    <li>
      {instance.book.title}
      <span className="interest-count">
        {` - ${interestsCount} ${people} interested`}
      </span>
    </li>
  );
}

OtherInterest.propTypes = {
  instance: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
