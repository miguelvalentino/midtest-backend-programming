const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .min(6)
        .max(32)
        .required()
        .label('Password'),
      password_confirm: joi.string().required().label('Password confirmation'),
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  changePassword: {
    body: {
      password_old: joi.string().required().label('Old password'),
      password_new: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .min(6)
        .max(32)
        .required()
        .label('New password'),
      password_confirm: joi.string().required().label('Password confirmation'),
    },
  },

  //membuat produk marketplace
  createmarket: {
    body: {
      namaproduk: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('Nama Produk :'),
      deskripsi: joi
        .string()
        .min(1)
        .max(200)
        .required()
        .label('Deskripsi Produk :'),
      harga: joi.number().required().label('Harga Produk :'),
      total: joi.number().required().label('Total Produk yang ada :'),
    },
  },

  //mengupdate produk yang ada
  updatemarket: {
    body: {
      namaproduk: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('Nama Produk :'),
      deskripsi: joi
        .string()
        .min(1)
        .max(200)
        .required()
        .label('Deskripsi Produk :'),
      harga: joi.number().required().label('Harga Produk :'),
      total: joi.number().required().label('Total Produk yang ada :'),
    },
  },
};
