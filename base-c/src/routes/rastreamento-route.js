"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/rastreamento-controller");
const validator = require("../validators/rastreamento-validator");

router.get("/rastreamento", validator.validate, controller.get);

module.exports = router;
