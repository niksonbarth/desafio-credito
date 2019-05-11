"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/login-controller");
const validator = require("../validators/login-validator");

router.post("/login", validator.validate, controller.login);

module.exports = router;
