const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const usersControllers = require('./users-controller');
const usersValidator = require('./users-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // Get list of users
  route.get('/', authenticationMiddleware, usersControllers.getUsers);

  // Create user
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(usersValidator.createUser),
    usersControllers.createUser
  );

  // Get user detail
  route.get('/:id', authenticationMiddleware, usersControllers.getUser);

  // Update user
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(usersValidator.updateUser),
    usersControllers.updateUser
  );

  // Delete user
  route.delete('/:id', authenticationMiddleware, usersControllers.deleteUser);

  // Change password
  route.post(
    '/:id/change-password',
    authenticationMiddleware,
    celebrate(usersValidator.changePassword),
    usersControllers.changePassword
  );
};

module.exports = (app) => {
  app.use('/produk', route);

  // membuat produk
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(usersValidator.createmarket),
    usersControllers.createmarket
  );

  // mendapatkan detail produk
  route.get('/:idproduk', authenticationMiddleware, usersControllers.getmarket);

  // Update produk
  route.put(
    '/:idproduk',
    authenticationMiddleware,
    celebrate(usersValidator.updatemarket),
    usersControllers.updatemarket
  );

  // Delete produk
  route.delete(
    '/:idproduk',
    authenticationMiddleware,
    usersControllers.deletemarket
  );
};
