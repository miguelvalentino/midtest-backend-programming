const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers({ skip, limit }) {
  const users = await usersRepository.getUsers({ skip, limit });

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the email is registered
 * @param {string} email - Email
 * @returns {boolean}
 */
async function emailIsRegistered(email) {
  const user = await usersRepository.getUserByEmail(email);

  if (user) {
    return true;
  }

  return false;
}

/**
 * Check whether the password is correct
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(userId, password) {
  const user = await usersRepository.getUser(userId);
  return passwordMatched(password, user.password);
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(userId, password) {
  const user = await usersRepository.getUser(userId);

  // Check if user not found
  if (!user) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const changeSuccess = await usersRepository.changePassword(
    userId,
    hashedPassword
  );

  if (!changeSuccess) {
    return null;
  }

  return true;
}

/**
 * createmarket untuk membuat produk baru
 * @param {string} namaproduk - nama produk
 * @param {string} deskripsi - deskripsi produk
 * @param {number} harga - harga produk
 * @param {number} total - total produk
 * @returns {boolean}
 */
async function createmarket(namaproduk, deskripsi, harga, total) {
  try {
    await usersRepository.createmarket(namaproduk, deskripsi, harga, total);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * getmarket menampilkan data produk
 * @param {string} idproduk - produk id
 * @returns {Promise}
 */
async function getmarket(idproduk) {
  const produk = await usersRepository.getmarket(idproduk);

  // produk not found
  if (!produk) {
    return null;
  }

  return {
    idproduk: produk.idproduk,
    namaproduk: produk.namaproduk,
    deskripsi: produk.deskripsi,
    total: produk.total,
  };
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
  const produk = await usersRepository.getmarket(idproduk);

  // produk not found
  if (!produk) {
    return null;
  }

  try {
    await usersRepository.updatemarket(
      idproduk,
      namaproduk,
      deskripsi,
      harga,
      total
    );
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * deletemarket untuk menghapus produk
 * @param {string} idproduk - id produk
 * @returns {Promise}
 */
async function deletemarket(idproduk) {
  const produk = await usersRepository.getmarket(idproduk);

  // produk not found
  if (!produk) {
    return null;
  }

  try {
    await usersRepository.deletemarket(idproduk);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailIsRegistered,
  checkPassword,
  changePassword,
  createmarket,
  getmarket,
  updatemarket,
  deletemarket,
};
