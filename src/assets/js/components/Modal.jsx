import React from 'react';
import PropTypes from 'prop-types';


export default function Modal(props) {
  const { handleClose, show, content } = props;
  return (
    <div className={show ? 'modal visible' : 'modal hidden'}>
      <section className="body">
        <section className="content">
          {content}
        </section>
        <section className="actions">
          <input type="button" className="button primary" value="Close" onClick={handleClose} />
        </section>
      </section>
    </div>
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
};
