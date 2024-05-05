const { User } = require('../../../models');
const { produk } = require('../../../models');

/**
 * Get a list of users
 * Bagian Pagination buat skip dan limit
 * @param {number} skip
 * @param {number} limit
 * @returns {Promise}
 */
async function getUsers({ skip, limit }) {
  return User.find({}).skip(skip).limit(limit);
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

/**
 * createmarket membuat produk baru
 * @param {string} namaproduk - Namaproduk
 * @param {string} deskripsi - deskripsi produk
 * @param {number} harga - Harga produk
 * @param {number} total - total produk yang ada
 * @returns {Promise}
 */
async function createmarket(namaproduk, deskripsi, harga, total) {
  return produk.create({
    namaproduk,
    deskripsi,
    harga,
    total,
  });
}

/**
 * getmarket menampilkan data produk
 * @param {string} idproduk- produk id
 * @returns {Promise}
 */
async function getmarket(idproduk) {
  return produk.findById(idproduk);
}

/**
 * updatemarket mengubah data produk
 * @param {string} idproduk - id produk
 * @param {string} namaproduk - namaproduk
 * @param {string} deskripsi - deskripsi produk
 * @param {number} harga - harga
 * @param {number} total - total barang
 * @returns {Promise}
 */
async function updatemarket(idproduk, namaproduk, deskripsi, harga, total) {
  return produk.updateOne(
    {
      _id: idproduk,
    },
    {
      $set: {
        namaproduk,
        deskripsi,
        harga,
        total,
      },
    }
  );
}

/**
 * deletemarket untuk menghapus produk
 * @param {string} idproduk - id produk
 * @returns {Promise}
 */
async function deletemarket(idproduk) {
  return produk.deleteOne({ _id: idproduk });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
  createmarket,
  getmarket,
  updatemarket,
  deletemarket,
};
