import React from 'react';
import PropTypes from 'prop-types';

export default function FollowButton(props) {
  const { toogleFollow, isFollowing } = props;
  return (
    <button
      type="submit"
      onClick={toogleFollow}
      className={`button fitted ${isFollowing ? 'secondary' : 'primary'}`}
    >
      {
        isFollowing ? 'Unfollow' : 'Follow'
      }
    </button>
  );
}

FollowButton.propTypes = {
  toogleFollow: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired,
};
