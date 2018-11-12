import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { buildBookPath } from '../services/books';


export default class PosessionContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      proposerInstanceId: null,
    };
  }

  async handleChange(event) {
    this.setState({ proposerInstanceId: event.target.value });
  }

  render() {
    const {
      posession,
      currentPosessions,
      onPropose,
      isSelf,
    } = this.props;
    const { proposerInstanceId } = this.state;
    const proposeeInstanceId = posession.id;
    const offerOptions = currentPosessions.map(
      instance => <option key={instance.id} value={instance.id}>{instance.book.title}</option>,
    );
    return (
      <div className="card-exchange-container">
        <a className="card-book" href={buildBookPath(posession.book)}>
          <img src={posession.book.imageUrl} alt={posession.book.title} />
          <div className="shadow">
            <p className="title">{posession.book.title}</p>
            <p className="author">{posession.book.author.name}</p>
          </div>
        </a>
        {
          (!isSelf && currentPosessions.length)
          && (
            <form className="flex-form-center" onSubmit={e => onPropose(e, proposerInstanceId, proposeeInstanceId)}>
              <select onChange={this.handleChange} required>
                <option disabled selected value>Select a book...</option>
                {offerOptions}
              </select>
              <input type="submit" value="Propose exchange" />
            </form>
          )
        }
      </div>
    );
  }
}

PosessionContainer.propTypes = {
  posession: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onPropose: PropTypes.func.isRequired,
  isSelf: PropTypes.bool.isRequired,
  currentPosessions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};
