import React from 'react';
import PropTypes from 'prop-types';
import OtherInterest from './OtherInterest';

export default function OthersInterests(props) {
  const { instances } = props;
  const rows = instances.map(instance => <OtherInterest instance={instance} key={instance.id} />);
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
