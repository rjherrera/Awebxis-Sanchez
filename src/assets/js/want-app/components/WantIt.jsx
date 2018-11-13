import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import { fetchInterest, wantBook, dontWantBook } from '../services/wants';

export default class WantIt extends Component {
  constructor(props) {
    super(props);
    const {
      bookId,
    } = this.props;
    this.state = {
      want: false,
      bookId,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadInterest();
  }

  async loadInterest() {
    const { username, bookId } = this.props;
    const interestId = await fetchInterest(username, bookId);
    this.setState({ interestId });
    this.setState({ want: interestId > 0 });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { want } = this.state;
    const { interestId } = this.state;
    this.setState({ want: !want });

    const path = '/interests/';

    if (!want) {
      const {
        bookId,
      } = this.state;
      wantBook(path, bookId);
      this.loadInterest();
      return null;
    }
    if (interestId !== -1) {
      return dontWantBook(path, interestId);
    }
    return null;
  }

  render() {
    const {
      want,
      bookId,
    } = this.state;

    if (want) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="submit" className="button secondary" value="Don't want it" />
        </form>
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <Field name="bookId" labelText="bookId" value={bookId} onChange={this.handleNameChange} />
        <input type="submit" className="button secondary" value="Want it" />
      </form>
    );
  }
}

WantIt.propTypes = {
  username: PropTypes.string.isRequired,
  bookId: PropTypes.string.isRequired,
};
