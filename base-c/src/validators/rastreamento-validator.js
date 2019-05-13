"use strict";

const { check } = require("express-validator/check");
const jwt = require("jsonwebtoken");

exports.validate = [
  check("cpf", "O cpf é obrigatório")
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check("token", "O token é obrigatório")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .custom(value => {
      return jwt.verify(value, process.env.TOKEN_KEY, function(err) {
        return err ? Promise.reject("O token está inválido") : true;
      });
    })
];
