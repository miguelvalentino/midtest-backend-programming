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

const produkSchema = new mongoose.Schema({
  namaproduk: String,
  deskripsi: String,
  harga: Number,
  total: Number,
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
const produk = mongoose.model('namaproduk', mongoose.Schema(produkSchema));

module.exports = {
  mongoose,
  User,
  produk,
};
