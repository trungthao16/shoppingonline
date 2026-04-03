require('../utils/MongooseUtil');
const mongoose = require('mongoose');
const Models = require('./Models');

const CategoryDAO = {
  async selectAll() {
    return await Models.Category.find({}).exec();
  },
  async insert(category) {
    category._id = new mongoose.Types.ObjectId();
    return await Models.Category.create(category);
  },
  async update(category) {
    const query = { _id: category._id };
    const newvalues = { name: category.name };
    return await Models.Category.findOneAndUpdate(query, newvalues, { new: true });
  },
  async delete(_id) {
    return await Models.Category.findByIdAndDelete(_id);
  }
};

module.exports = CategoryDAO;
