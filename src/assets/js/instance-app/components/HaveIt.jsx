import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import { fetchInstance, haveBook, dontHaveBook } from '../services/instances';

export default class HaveIt extends Component {
  constructor(props) {
    super(props);
    const {
      bookId, state, comment, store,
    } = this.props;
    store.subscribers.push(this);
    this.store = store;
    this.state = {
      have: false, bookId, state, comment, instanceId: -1,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadInstance();
  }

  async loadInstance() {
    const { username, bookId } = this.props;
    const instanceId = await fetchInstance(username, bookId);
    this.setState({ have: instanceId > 0, instanceId });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { have, bookId, instanceId } = this.state;
    this.setState({ have: !have });

    const path = '/book-instances/';

    if (!have) {
      const { state, comment } = this.state;
      haveBook(path, bookId, state, comment);
      this.loadInstance();
    } else {
      dontHaveBook(path, instanceId);
    }
  }

  render() {
    const {
      have, bookId, state, comment,
    } = this.state;

    if (have) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="submit" className="button secondary" value="Don't have it" />
        </form>
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <Field name="bookId" labelText="bookId" value={bookId} onChange={this.handleNameChange} />
        <Field name="state" labelText="state" value={state} onChange={this.handleNameChange} />
        <Field name="comment" labelText="comment" value={comment} onChange={this.handleNameChange} />
        <input type="submit" className="button secondary" value="Have it" />
      </form>
    );
  }
}

HaveIt.propTypes = {
  username: PropTypes.string.isRequired,
  bookId: PropTypes.string.isRequired,
  state: PropTypes.string,
  comment: PropTypes.string,
  store: PropTypes.shape({}).isRequired,
};

HaveIt.defaultProps = {
  state: '2',
  comment: 'not bad',
};
