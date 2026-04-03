import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = { categories: [], txtID: '', txtName: '', txtPrice: 0, cmbCategory: '', imgProduct: '' };
  }

  render() {
    const cates = this.state.categories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>);
    return (
      <div className="float-right">
        <h2 className="text-center">PRODUCT DETAIL</h2>
        <form>
          <table>
            <tbody>
              <tr><td>ID</td><td><input type="text" value={this.state.txtID} readOnly /></td></tr>
              <tr><td>Name</td><td><input type="text" value={this.state.txtName} onChange={(e) => this.setState({ txtName: e.target.value })} /></td></tr>
              <tr><td>Price</td><td><input type="number" value={this.state.txtPrice} onChange={(e) => this.setState({ txtPrice: e.target.value })} /></td></tr>
              <tr><td>Category</td><td><select value={this.state.cmbCategory} onChange={(e) => this.setState({ cmbCategory: e.target.value })}>{cates}</select></td></tr>
              <tr><td>Image</td><td><input type="file" accept="image/*" onChange={(e) => this.previewImage(e)} /></td></tr>
              <tr><td></td><td>{this.state.imgProduct ? <img src={this.state.imgProduct.startsWith('data:') ? this.state.imgProduct : 'data:image/jpg;base64,' + this.state.imgProduct} width="100" height="100" alt="" className="preview" /> : <div />}</td></tr>
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

  componentDidMount() { this.apiGetCategories(); }
  componentDidUpdate(prevProps) {
    if (this.props.item && this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category?._id,
        imgProduct: this.props.item.image
      });
    }
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const categories = res.data;
      this.setState({ categories, cmbCategory: categories.length > 0 ? categories[0]._id : '' });
    });
  }

  previewImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => this.setState({ imgProduct: reader.result });
    reader.readAsDataURL(file);
  }

  buildProduct() {
    const category = this.state.categories.find((x) => x._id === this.state.cmbCategory) || null;
    const image = this.state.imgProduct.startsWith('data:') ? this.state.imgProduct.split(',')[1] : this.state.imgProduct;
    return {
      _id: this.state.txtID,
      name: this.state.txtName,
      price: parseFloat(this.state.txtPrice),
      image,
      cdate: new Date().getTime(),
      category
    };
  }

  btnAddClick(e) {
    e.preventDefault();
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', this.buildProduct(), config).then(() => {
      alert('Add product successfully');
      this.props.apiGetProducts(1);
    });
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products', this.buildProduct(), config).then(() => {
      alert('Update product successfully');
      this.props.apiGetProducts();
    });
  }

  btnDeleteClick(e) {
    e.preventDefault();
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + this.state.txtID, config).then(() => {
      alert('Delete product successfully');
      this.props.apiGetProducts();
      this.setState({ txtID: '', txtName: '', txtPrice: 0, imgProduct: '' });
    });
  }
}

export default ProductDetail;
