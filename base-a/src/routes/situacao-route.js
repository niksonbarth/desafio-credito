"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/situacao-controller");
const validator = require("../validators/situacao-validator");

router.get("/situacaofinanceira", validator.validate, controller.get);

module.exports = router;
