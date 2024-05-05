const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of users request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUsers(request, response, next) {
  try {
    //pagination dan sort menggunakan
    //http://localhost:5000/api/users?page_number=1&page_size=1&search=email:test&sort=email:desc
    const page = request.query.page_number || 1;
    const limit = request.query.page_size || 3;
    const skip = (page - 1) * limit;
    const search = request.query.search || '';
    const sort = request.query.sort || '';

    const users = await usersService.getUsers({
      skip,
      limit,
      search,
      sort,
    });

    const responsedata = {
      page_number: page,
      page_size: limit,
      count: users.length,
      data: users,
    };
    return response.status(200).json(responsedata);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get user detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUser(request, response, next) {
  try {
    const user = await usersService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown user');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createUser(request, response, next) {
  try {
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const password_confirm = request.body.password_confirm;

    // Check confirmation password
    if (password !== password_confirm) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'Password confirmation mismatched'
      );
    }

    // Email must be unique
    const emailIsRegistered = await usersService.emailIsRegistered(email);
    if (emailIsRegistered) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email is already registered'
      );
    }

    const success = await usersService.createUser(name, email, password);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create user'
      );
    }

    return response.status(200).json({ name, email });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateUser(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const email = request.body.email;

    // Email must be unique
    const emailIsRegistered = await usersService.emailIsRegistered(email);
    if (emailIsRegistered) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email is already registered'
      );
    }

    const success = await usersService.updateUser(id, name, email);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteUser(request, response, next) {
  try {
    const id = request.params.id;

    const success = await usersService.deleteUser(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle change user password request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function changePassword(request, response, next) {
  try {
    // Check password confirmation
    if (request.body.password_new !== request.body.password_confirm) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'Password confirmation mismatched'
      );
    }

    // Check old password
    if (
      !(await usersService.checkPassword(
        request.params.id,
        request.body.password_old
      ))
    ) {
      throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Wrong password');
    }

    const changeSuccess = await usersService.changePassword(
      request.params.id,
      request.body.password_new
    );

    if (!changeSuccess) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to change password'
      );
    }

    return response.status(200).json({ id: request.params.id });
  } catch (error) {
    return next(error);
  }
}

// // PAGINATION kayaknya
// async function pagination(request) {
//   const page = request.query.page_number * 1 || 1;
//   const limit = request.query.page_limit * 1 || 5;
//   const skip = (page - 1) * limit;
//   query = query.skip(skip).limit(limit);
// }

/**
 * createmarket untuk membuat produk
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createmarket(request, response, next) {
  try {
    const namaproduk = request.body.namaproduk;
    const deskripsi = request.body.deskripsi;
    const harga = request.body.harga;
    const total = request.body.total;

    const success = await usersService.createmarket(
      namaproduk,
      deskripsi,
      harga,
      total
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'gagal membuat produk'
      );
    }

    return response.status(200).json({ namaproduk, deskripsi, harga, total });
  } catch (error) {
    return next(error);
  }
}

/**
 * getmarket untuk melihat produk yang ada
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getmarket(request, response, next) {
  try {
    const namaproduk = await usersService.getmarket(request.params.idproduk);

    if (!namaproduk) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'produk tidak diketahui'
      );
    }

    return response.status(200).json(namaproduk);
  } catch (error) {
    return next(error);
  }
}

/**
 * updatemarket untuk mengedit produk yang telah ada
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updatemarket(request, response, next) {
  try {
    const idproduk = request.params.idproduk;
    const namaproduk = request.body.namaproduk;
    const deskripsi = request.body.deskripsi;
    const harga = request.body.harga;
    const total = request.body.total;

    const success = await usersService.updatemarket(
      idproduk,
      namaproduk,
      deskripsi,
      harga,
      total
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'gagal mengubah data produk'
      );
    }

    return response.status(200).json({ idproduk });
  } catch (error) {
    return next(error);
  }
}

/**
 * deletemarket untuk menghapus produk yang dipilih
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deletemarket(request, response, next) {
  try {
    const idproduk = request.params.idproduk;
    const success = await usersService.deletemarket(idproduk);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'gagal menghapus produk'
      );
    }

    return response.status(200).json({ idproduk });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
  createmarket,
  getmarket,
  updatemarket,
  deletemarket,
};
