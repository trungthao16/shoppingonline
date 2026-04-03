import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = { txtID: '', txtToken: '' };
  }

  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">ACTIVE ACCOUNT</h2>
        <form>
          <table className="align-center">
            <tbody>
              <tr><td>ID</td><td><input type="text" value={this.state.txtID} onChange={(e) => this.setState({ txtID: e.target.value })} /></td></tr>
              <tr><td>Token</td><td><input type="text" value={this.state.txtToken} onChange={(e) => this.setState({ txtToken: e.target.value })} /></td></tr>
              <tr><td></td><td><input type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)} /></td></tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  btnActiveClick(e) {
    e.preventDefault();
    axios.post('/api/customer/active', { id: this.state.txtID, token: this.state.txtToken }).then((res) => {
      if (res.data) alert('Active account successfully');
      else alert('Active account failed');
    });
  }
}

export default Active;
