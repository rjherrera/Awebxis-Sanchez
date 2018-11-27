import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OtherInterest from './OtherInterest';
import InterestedUsersModal from '../modals/InterestedUsersModal';


export default class OthersInterests extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpened: false, modalBook: null };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  openModal(book) {
    this.setState({ modalOpened: true, modalBook: book });
  }

  closeModal() {
    this.setState({ modalOpened: false });
  }

  render() {
    const { instances } = this.props;
    const rows = instances.map(instance => (
      <OtherInterest instance={instance} onClick={this.openModal} key={instance.id} />
    ));
    const { modalOpened, modalBook } = this.state;
    return rows.length ? (
      <React.Fragment>
        <InterestedUsersModal
          show={modalOpened}
          handleClose={this.closeModal}
          book={modalBook}
        />
        <ul>
          {rows}
        </ul>
      </React.Fragment>
    ) : (
      <p className="empty-message">You don&apos;t own any book</p>
    );
  }
}

OthersInterests.propTypes = {
  instances: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};
