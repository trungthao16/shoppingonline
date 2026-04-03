const express = require('express');
const router = express.Router();
const CryptoUtil = require('../utils/CryptoUtil');
const EmailUtil = require('../utils/EmailUtil');
const JwtUtil = require('../utils/JwtUtil');
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');
const CustomerDAO = require('../models/CustomerDAO');
const OrderDAO = require('../models/OrderDAO');

router.get('/categories', async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});

router.get('/products/new', async function (req, res) {
  const products = await ProductDAO.selectTopNew(3);
  res.json(products);
});

router.get('/products/hot', async function (req, res) {
  const products = await ProductDAO.selectTopHot(3);
  res.json(products);
});

router.get('/products/category/:cid', async function (req, res) {
  const products = await ProductDAO.selectByCategory(req.params.cid);
  res.json(products);
});

router.get('/products/search/:keyword', async function (req, res) {
  const products = await ProductDAO.selectByKeyword(req.params.keyword);
  res.json(products);
});

router.get('/products/:id', async function (req, res) {
  const product = await ProductDAO.selectByID(req.params.id);
  res.json(product);
});

router.post('/signup', async function (req, res) {
  const { username, password, name, phone, email } = req.body;
  const dbCust = await CustomerDAO.selectByUsernameOrEmail(username, email);

  if (dbCust) {
    res.json({ success: false, message: 'Exists username or email' });
  } else {
    const token = CryptoUtil.md5(new Date().getTime().toString());
    const newCust = {
      username: username,
      password: password,
      name: name,
      phone: phone,
      email: email,
      active: 0,
      token: token
    };

    const result = await CustomerDAO.insert(newCust);
    if (result) {
      try {
        await EmailUtil.send(email, result._id, token);
        res.json({ success: true, message: 'Please check email' });
      } catch (err) {
        res.json({ success: false, message: 'Email failure' });
      }
    } else {
      res.json({ success: false, message: 'Insert failure' });
    }
  }
});

router.post('/active', async function (req, res) {
  const result = await CustomerDAO.active(req.body.id, req.body.token, 1);
  res.json(result);
});

router.post('/login', async function (req, res) {
  const { username, password } = req.body;

  if (username && password) {
    const customer = await CustomerDAO.selectByUsernameAndPassword(username, password);

    if (customer) {
      if (customer.active === 0) {
        res.json({ success: false, message: 'Your account is not active' });
      } else {
        const token = JwtUtil.genToken(username, password);
        res.json({
          success: true,
          message: 'Authentication successful',
          token: token,
          customer: customer
        });
      }
    } else {
      res.json({ success: false, message: 'Incorrect username or password' });
    }
  } else {
    res.json({ success: false, message: 'Please input username and password' });
  }
});

router.put('/myprofile', JwtUtil.checkToken, async function (req, res) {
  const result = await CustomerDAO.update(req.body);
  res.json(result);
});

router.post('/checkout', JwtUtil.checkToken, async function (req, res) {
  const now = new Date().getTime(); // milliseconds
  const total = req.body.total;
  const items = req.body.items;
  const customer = req.body.customer;
  const order = {
    cdate: now,
    total: total,
    status: 'PENDING',
    customer: customer,
    items: items
  };

  const result = await OrderDAO.insert(order);
  res.json(result);
});

// myorders
router.get('/orders/customer/:cid', JwtUtil.checkToken, async function (req, res) {
  const _cid = req.params.cid;
  const orders = await OrderDAO.selectByCustID(_cid);
  res.json(orders);
});

module.exports = router;