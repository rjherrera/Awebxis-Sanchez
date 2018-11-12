import React from 'react';
import PropTypes from 'prop-types';
import PosessionContainer from './PosessionContainer';


export default function Posessions(props) {
  const {
    posessions,
    currentPosessions,
    username,
    currentUsername,
    onPropose,
  } = props;
  const rows = posessions.map(posession => (
    <PosessionContainer
      key={posession.id}
      isSelf={username === currentUsername}
      posession={posession}
      currentPosessions={currentPosessions}
      onPropose={onPropose}
    />
  ));
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
    id: PropTypes.number.isRequired,
  })).isRequired,
  currentPosessions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  username: PropTypes.string.isRequired,
  currentUsername: PropTypes.string.isRequired,
  onPropose: PropTypes.func.isRequired,
};
