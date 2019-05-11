"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/bens-controller");
const validator = require("../validators/bens-validator");

router.get("/bensrenda", validator.validate, controller.get);

module.exports = router;
