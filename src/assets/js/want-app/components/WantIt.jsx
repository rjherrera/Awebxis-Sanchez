import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import { fetchInterest, wantBook, dontWantBook } from '../services/wants';

export default class WantIt extends Component {
  constructor(props) {
    super(props);
    const { bookId, store } = this.props;
    this.store = store;
    this.state = { bookId, want: false, interestId: -1 };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadInterest();
  }

  async loadInterest() {
    const { username, bookId } = this.props;
    const interestId = await fetchInterest(username, bookId);
    this.setState({ want: interestId > 0 });
    this.setState({ interestId });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { username } = this.props;
    const { want, bookId, interestId } = this.state;
    this.setState({ want: !want });

    if (!want) {
      const { id } = await wantBook(username, bookId);
      this.setState({ interestId: id });
    } else {
      await dontWantBook(username, interestId);
      this.setState({ interestId: -1 });
    }
  }

  render() {
    const { want, bookId } = this.state;

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
