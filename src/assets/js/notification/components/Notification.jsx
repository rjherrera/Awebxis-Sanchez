import React from 'react';
import PropTypes from 'prop-types';

export default function Notification(props) {
  const { text, type, onDismiss } = props;
  return (
    <div className={`notification ${type}`}>
      {text}
      <button type="submit" onClick={onDismiss} className="button button-close">
        OK
      </button>
    </div>
  );
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
