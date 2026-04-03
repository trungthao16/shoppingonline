import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], keyword: '' };
  }

  render() {
    const cates = this.state.categories.map((item) => (
      <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
    ));

    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
            <li className="menu"><Link to="/home">Home</Link></li>
            {cates}
          </ul>
        </div>
        <div className="float-right">
          <form className="search">
            <input type="search" placeholder="Enter keyword" value={this.state.keyword} onChange={(e) => this.setState({ keyword: e.target.value })} />
            <Link to={'/product/search/' + this.state.keyword}>SEARCH</Link>
          </form>
        </div>
        <div className="float-clear" />
      </div>
    );
  }

  componentDidMount() { this.apiGetCategories(); }
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => this.setState({ categories: res.data }));
  }
}

export default Menu;
