import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { newprods: [], hotprods: [] };
  }

  renderProductBlock(title, products) {
    return (
      <div className="align-center">
        <h2 className="text-center">{title}</h2>
        {products.map((item) => (
          <div key={item._id} className="inline">
            <figure>
              <Link to={'/product/' + item._id}><img src={'data:image/jpg;base64,' + item.image} width="300" height="300" alt="" /></Link>
              <figcaption className="text-center">{item.name}<br />Price: {item.price}</figcaption>
            </figure>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderProductBlock('NEW PRODUCTS', this.state.newprods)}
        {this.state.hotprods.length > 0 ? this.renderProductBlock('HOT PRODUCTS', this.state.hotprods) : <div />}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  apiGetNewProducts() { axios.get('/api/customer/products/new').then((res) => this.setState({ newprods: res.data })); }
  apiGetHotProducts() { axios.get('/api/customer/products/hot').then((res) => this.setState({ hotprods: res.data })); }
}

export default Home;
