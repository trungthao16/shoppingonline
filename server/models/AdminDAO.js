require('../utils/MongooseUtil');
const Models = require('./Models');

const AdminDAO = {
  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password };
    return await Models.Admin.findOne(query);
  }
};

module.exports = AdminDAO;
