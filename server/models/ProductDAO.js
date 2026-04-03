require('../utils/MongooseUtil');
const mongoose = require('mongoose');
const Models = require('./Models');

const ProductDAO = {
  async selectAll() {
    return await Models.Product.find({}).exec();
  },
  async selectByID(_id) {
    return await Models.Product.findById(_id).exec();
  },
  async selectByCategory(cid) {
    return await Models.Product.find({ 'category._id': cid }).exec();
  },
  async selectByKeyword(keyword) {
    return await Models.Product.find({ name: { $regex: new RegExp(keyword, 'i') } }).exec();
  },
  async selectTopNew(top) {
    return await Models.Product.find({}).sort({ cdate: -1 }).limit(top).exec();
  },
  async selectTopHot(top) {
    const items = await Models.Order.aggregate([
      { $match: { status: 'APPROVED' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.product._id', sum: { $sum: '$items.quantity' } } },
      { $sort: { sum: -1 } },
      { $limit: top }
    ]).exec();
    const products = [];
    for (const item of items) {
      const product = await this.selectByID(item._id);
      if (product) products.push(product);
    }
    return products;
  },
  async insert(product) {
    product._id = new mongoose.Types.ObjectId();
    return await Models.Product.create(product);
  },
  async update(product) {
    const query = { _id: product._id };
    const newvalues = {
      name: product.name,
      price: product.price,
      image: product.image,
      cdate: product.cdate,
      category: product.category
    };
    return await Models.Product.findOneAndUpdate(query, newvalues, { new: true });
  },
  async delete(_id) {
    return await Models.Product.findByIdAndDelete(_id);
  }
};

module.exports = ProductDAO;
