import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal';

function interestedUsers(book) {
  const links = book.interests.map(i => (
    <li ><a href={i.user.username}>{i.user.username}</a></li>
  ));
  return (
    <React.Fragment>
      <h3>These users have shown interest in <span className="bolded">{book.title}</span>!</h3>
      <ul>{links}</ul>
      <p>Visit their profile to see what they have to offer!</p>
    </React.Fragment>
  );
}


export default function InterestedUsersModal(props) {
  const { show, handleClose, book } = props;
  const content = book ? interestedUsers(book) : '';
  return (
    <Modal show={show} handleClose={handleClose} content={content} />
  );
}

InterestedUsersModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
