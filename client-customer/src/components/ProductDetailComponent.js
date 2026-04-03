import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  render() {
    const product = this.state.product;
    if (product == null) {
      return (
        <div className="align-center">
          <h2 className="text-center">LOADING...</h2>
        </div>
      );
    }

    return (
      <div className="align-center">
        <h2 className="text-center">PRODUCT DETAIL</h2>
        <form>
          <table className="align-center">
            <tbody>
              <tr>
                <td rowSpan="6">
                  <img
                    src={'data:image/jpg;base64,' + product.image}
                    width="300"
                    height="300"
                    alt=""
                  />
                </td>
                <td>ID: {product._id}</td>
              </tr>
              <tr>
                <td>Name: {product.name}</td>
              </tr>
              <tr>
                <td>Price: {product.price}</td>
              </tr>
              <tr>
                <td>Category: {product.category ? product.category.name : ''}</td>
              </tr>
              <tr>
                <td>Creation date: {new Date(product.cdate).toLocaleString()}</td>
              </tr>
              <tr>
                <td align="right">
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={this.state.txtQuantity}
                    onChange={(e) => this.setState({ txtQuantity: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    type="submit"
                    value="ADD TO CART"
                    onClick={(e) => this.btnAdd2CartClick(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidMount() {
    const id = this.props.params.id;
    this.apiGetProduct(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.id !== prevProps.params.id) {
      const id = this.props.params.id;
      this.apiGetProduct(id);
    }
  }

  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({
        product: result,
        txtQuantity: 1
      });
    });
  }

  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);

    if (quantity) {
      const mycart = [...this.context.mycart];
      const index = mycart.findIndex((x) => x.product._id === product._id); // check if the _id exists in mycart

      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }

      this.context.setMycart(mycart);
      alert('OK BABY!');
    } else {
      alert('Please input quantity');
    }
  }
}

export default withRouter(ProductDetail);