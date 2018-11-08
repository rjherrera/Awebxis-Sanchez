import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

const fetch = require('node-fetch');


export default class HaveIt extends Component {
  constructor(props) {
    super(props);
    const { instanceId } = this.props;
    const { bookId } = this.props;
    const { state } = this.props;
    const { comment } = this.props;
    this.state = {
      have: instanceId > 0,
      instanceId,
      bookId,
      state,
      comment,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { have } = this.state;
    const { instanceId } = this.props;
    // console.log('props', this.props);
    // console.log('state', this.state);
    this.setState({ have: !have });

    const path = '/book-instances/';

    if (!have) {
      console.log('have!');
      const {
        bookId,
        state,
        comment,
      } = this.state;
      console.log('Parameters are', bookId, state, comment);
      fetch(path, {
        method: 'post',
        body: JSON.stringify({ bookId, state, comment }),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
        .then(response => console.log(response));
    }
    console.log("don't have!");
    if (instanceId !== -1) {
      return fetch(`${path}${instanceId}`, {
        method: 'post',
        body: JSON.stringify({
          _method: 'delete',
        }),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
        .then(response => response);
    }
    console.log("instanceID is -1, won't delete anything");
    return null;
  }


  render() {
    // const { have } = this.state;
    console.log(this.state);
    const {
      have,
      bookId,
      state,
      comment,
    } = this.state;
    // const { instanceId } = this.props;
    // console.log(`bookInstancePath is ${bookInstancePath}`);
    // console.log(`Instance is ${instanceId}`);
    if (have) {
      console.log('have branch');
      //   action={`book-instances/${instanceId}`}
      return (
        <form onSubmit={this.handleSubmit}>
          {/* <input type="hidden" name="_method" value="delete" /> */}
          <input type="submit" className="button secondary" value="Don't have it" />
        </form>
      );
    }
    console.log('dont have branch');
    return (
      <form onSubmit={this.handleSubmit}>
        <Field name="bookId" labelText="bookId" value={bookId} onChange={this.handleNameChange} />
        <Field name="state" labelText="state" value={state} onChange={this.handleNameChange} />
        <Field name="comment" labelText="comment" value={comment} onChange={this.handleNameChange} />
        {/* <input type="hidden" name="bookId" value="<%= book.id %>" /> */}
        {/* <input type="hidden" name="state" value="2" /> */}
        {/* <input type="hidden" name="comment" value="Not that good" /> */}
        <input type="submit" className="button secondary" value="Have it" />
      </form>
    );
  }
}

HaveIt.propTypes = {
  instanceId: PropTypes.number.isRequired,
  bookId: PropTypes.number.isRequired,
  state: PropTypes.string,
  comment: PropTypes.string,
};

HaveIt.defaultProps = {
  state: '2',
  comment: 'not bad',
};
