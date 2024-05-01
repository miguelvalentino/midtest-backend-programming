const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

//pagination menggunakan mongoose paginate
const mongoosePaginate = require('mongoose-paginate-v2');
const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

usersSchema.plugin(mongoosePaginate);
const User = mongoose.model('users', mongoose.Schema(usersSchema));

module.exports = {
  mongoose,
  User,
};
