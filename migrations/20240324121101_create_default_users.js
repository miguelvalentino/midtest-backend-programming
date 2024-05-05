const logger = require('../src/core/logger')('api');
const { User } = require('../src/models');
const { produk } = require('../src/models');
const { hashPassword } = require('../src/utils/password');

const name = 'bujang123';
const email = 'bujang123@example.com';
const password = 'bujang123';

const namaproduk = 'cacing besar alaska';
const deskripsi = 'cacing besar';
const harga = 'Rp. 69000';
const total = '50';

logger.info('Creating default users');

(async () => {
  try {
    const numUsers = await User.countDocuments({
      name,
      email,
    });

    if (numUsers > 0) {
      throw new Error(`User ${email} already exists`);
    }

    const hashedPassword = await hashPassword(password);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();

(async () => {
  try {
    const numproduk = await produk.countDocuments({
      namaproduk,
      deskripsi,
      harga,
      total,
    });

    if (numproduk > 0) {
      throw new Error(`produk ${namaproduk} sudah ada`);
    }
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();
