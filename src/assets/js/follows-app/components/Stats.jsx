import React from 'react';
import PropTypes from 'prop-types';

export default function Stats(props) {
  const { followers, following } = props;
  return (
    <h4>
      {
        `${followers.length} followers and following ${following.length} people`
      }
    </h4>
  );
}

Stats.propTypes = {
  followers: PropTypes.arrayOf(PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  })).isRequired,
  following: PropTypes.arrayOf(PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  })).isRequired,
};
