const mongoose = require('mongoose');
const config = require('../config/mongo');

module.exports = async (ctx, next) => {
  mongoose.connect(config.url);
  mongoose.Promise = global.Promise;
  await next();
};