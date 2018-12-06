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

  updateInstancesAmountBy(n) {
    this.store.setState({ instances: this.store.state.instances + n });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { username } = this.props;
    const { have, bookId, instanceId } = this.state;
    this.setState({ have: !have });

    if (!have) {
      const { state, comment } = this.state;
      const { id } = await haveBook(username, bookId, state, comment);
      this.updateInstancesAmountBy(1);
      this.setState({ instanceId: id });
    } else {
      await dontHaveBook(username, instanceId);
      this.updateInstancesAmountBy(-1);
      this.setState({ instanceId: -1 });
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
