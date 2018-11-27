import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import fetchToken from '../services/token';

export default class TokenContainer extends Component {
  constructor(props) {
    super(props);
    this.getToken = this.getToken.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.state = { token: '', copied: false };
  }

  onChange({ target: { token } }) {
    this.setState({ token, copied: false });
  }

  onCopy() {
    this.setState({ copied: true });
  }

  async getToken() {
    const token = await fetchToken();
    this.setState({ token });
  }

  render() {
    const { token, copied } = this.state;
    return (
      <div className="form-container">
        <div className="form-card">
          <h1 className="form-title">
            New API Token
          </h1>
          <div>
            <input type="text" name="name" placeholder="Click generate to create a new API token" value={token} disabled />
          </div>
          <div className="button copy">
            {
              !token && <button type="submit" onClick={this.getToken} className="button primary">Generate</button>
            }
            {
              token && !copied
              && (
                <CopyToClipboard text={token} onCopy={this.onCopy}>
                  <button type="submit" className="button secondary fitted">Copy</button>
                </CopyToClipboard>
              )
            }
            {
              token && copied && <h2 className="form-title">Copied!</h2>
            }
          </div>
        </div>
      </div>
    );
  }
}
