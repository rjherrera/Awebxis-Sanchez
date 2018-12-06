import React from 'react';
import PropTypes from 'prop-types';

export default function Stat(props) {
  const { value, relative, name } = props;
  return (
    <div className="stat">
      <div className="bar">
        <div className={`filled-${relative}`} />
        <div className={`not-filled-${100 - relative}`} />
      </div>
      <div className="text">{value} {name}</div>
    </div>
  );
}

Stat.propTypes = {
  value: PropTypes.number.isRequired,
  relative: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
