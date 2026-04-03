import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = { txtID: '', txtName: '' };
  }

  render() {
    return (
      <div className="float-right">
        <h2 className="text-center">CATEGORY DETAIL</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td><input type="text" value={this.state.txtID} readOnly /></td>
              </tr>
              <tr>
                <td>Name</td>
                <td><input type="text" value={this.state.txtName} onChange={(e) => this.setState({ txtName: e.target.value })} /></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} />
                  <input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
                  <input type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.item && this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }

  btnAddClick(e) {
    e.preventDefault();
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', { name: this.state.txtName }, config).then(() => {
      alert('Add category successfully');
      this.setState({ txtID: '', txtName: '' });
      this.props.apiGetCategories();
    });
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories', { _id: this.state.txtID, name: this.state.txtName }, config).then(() => {
      alert('Update category successfully');
      this.props.apiGetCategories();
    });
  }

  btnDeleteClick(e) {
    e.preventDefault();
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + this.state.txtID, config).then(() => {
      alert('Delete category successfully');
      this.setState({ txtID: '', txtName: '' });
      this.props.apiGetCategories();
    });
  }
}

export default CategoryDetail;
