// import React, { Component } from 'react';

// class Home extends Component {
//   render() {
//     return (
//       <div className="align-center">
//         <h2 className="text-center">ADMIN HOME</h2>
//         <img src="https://cliparting.com/wp-content/uploads/2018/03/animated-emoticons-2018-13.gif" width="800" height="600" alt="" />
//       </div>
//     );
//   }
// }

// export default Home;
// import React, { Component } from 'react';

// class Home extends Component {
//   render() {
//     return (
//       <div className="align-center">
//         <h2 className="text-center">ADMIN HOME</h2>
//         <img
//           src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"
//           width="800"
//           height="500"
//           alt="admin-home"
//         />
//       </div>
//     );
//   }
// }

// export default Home;

import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="admin-home">
        <div className="admin-home-banner">
          <div className="admin-home-overlay">
            <h1 className="admin-home-title">ADMIN DASHBOARD</h1>
            <p className="admin-home-subtitle">
              Welcome back! Manage categories, products and orders here.
            </p>
          </div>
        </div>

        <div className="admin-home-cards">
          <div className="admin-home-card">
            <h3>Category</h3>
            <p>Manage product categories quickly and easily.</p>
          </div>

          <div className="admin-home-card">
            <h3>Product</h3>
            <p>Add, update and delete products in the system.</p>
          </div>

          <div className="admin-home-card">
            <h3>Order</h3>
            <p>Track customer orders and approve pending orders.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;