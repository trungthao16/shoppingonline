import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], title: 'PRODUCT LIST' };
  }

  render() {
    const prods = this.state.products.map((item) => (
      <div key={item._id} className="inline">
        <figure>
          <Link to={'/product/' + item._id}><img src={'data:image/jpg;base64,' + item.image} width="300" height="300" alt="" /></Link>
          <figcaption className="text-center">{item.name}<br />Price: {item.price}</figcaption>
        </figure>
      </div>
    ));

    return (
      <div className="align-center">
        <h2 className="text-center">{this.state.title}</h2>
        {prods}
      </div>
    );
  }

  componentDidMount() { this.loadData(); }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) this.loadData();
  }

  loadData() {
    const { pathname } = this.props.location;
    if (pathname.startsWith('/product/category/')) {
      const cid = this.props.params.cid;
      axios.get('/api/customer/products/category/' + cid).then((res) => this.setState({ products: res.data, title: 'PRODUCT CATEGORY' }));
    } else if (pathname.startsWith('/product/search/')) {
      const keyword = this.props.params.keyword || '';
      axios.get('/api/customer/products/search/' + keyword).then((res) => this.setState({ products: res.data, title: 'SEARCH RESULT' }));
    }
  }
}

export default withRouter(Product);
