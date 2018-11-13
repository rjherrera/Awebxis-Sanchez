import React from 'react';
import PropTypes from 'prop-types';
import Interest from './Interest';

export default function Interests(props) {
  const { interests } = props;
  const rows = interests.map(interest => <Interest interest={interest} key={interest.id} />);
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
    id: PropTypes.number.isRequired,
  })).isRequired,
};
