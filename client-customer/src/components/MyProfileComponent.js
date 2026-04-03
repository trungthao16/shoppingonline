import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class MyProfile extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = { txtID: '', txtUsername: '', txtName: '', txtPhone: '', txtEmail: '' };
  }

  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">MY PROFILE</h2>
        <form>
          <table className="align-center">
            <tbody>
              <tr><td>ID</td><td><input type="text" value={this.state.txtID} readOnly /></td></tr>
              <tr><td>Username</td><td><input type="text" value={this.state.txtUsername} readOnly /></td></tr>
              <tr><td>Name</td><td><input type="text" value={this.state.txtName} onChange={(e) => this.setState({ txtName: e.target.value })} /></td></tr>
              <tr><td>Phone</td><td><input type="text" value={this.state.txtPhone} onChange={(e) => this.setState({ txtPhone: e.target.value })} /></td></tr>
              <tr><td>Email</td><td><input type="email" value={this.state.txtEmail} onChange={(e) => this.setState({ txtEmail: e.target.value })} /></td></tr>
              <tr><td></td><td><input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} /></td></tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidMount() {
    const customer = this.context.customer;
    if (customer) {
      this.setState({ txtID: customer._id, txtUsername: customer.username, txtName: customer.name, txtPhone: customer.phone, txtEmail: customer.email });
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const config = { headers: { 'x-access-token': this.context.token } };
    const customer = { _id: this.state.txtID, username: this.state.txtUsername, name: this.state.txtName, phone: this.state.txtPhone, email: this.state.txtEmail };
    axios.put('/api/customer/myprofile', customer, config).then((res) => {
      this.context.setCustomer(res.data);
      alert('Update profile successfully');
    });
  }
}

export default MyProfile;
