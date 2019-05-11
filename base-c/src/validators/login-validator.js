"use strict";

const { check } = require("express-validator/check");

exports.validate = [
  check("login", "O login é obrigatório")
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check("senha", "A senha é obrigatória")
    .not()
    .isEmpty()
    .trim()
    .escape()
];
