require('../utils/MongooseUtil');
const mongoose = require('mongoose');
const Models = require('./Models');

const CustomerDAO = {
  async selectByUsernameOrEmail(username, email) {
    return await Models.Customer.findOne({ $or: [{ username: username }, { email: email }] });
  },

  async selectByUsernameAndPassword(username, password) {
    return await Models.Customer.findOne({ username: username, password: password });
  },

  async selectAll() {
    const query = {};
    const customers = await Models.Customer.find(query).exec();
    return customers;
  },

  async selectByID(_id) {
    const customer = await Models.Customer.findById(_id).exec();
    return customer;
  },

  async insert(customer) {
    customer._id = new mongoose.Types.ObjectId();
    return await Models.Customer.create(customer);
  },

  async active(_id, token, active) {
    return await Models.Customer.findOneAndUpdate(
      { _id: _id, token: token },
      { active: active },
      { new: true }
    );
  },

  async update(customer) {
    return await Models.Customer.findOneAndUpdate(
      { _id: customer._id },
      { name: customer.name, phone: customer.phone, email: customer.email },
      { new: true }
    );
  }
};

module.exports = CustomerDAO;