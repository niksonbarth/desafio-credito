"use strict";

const { validationResult } = require("express-validator/check");
const mockbase = require("../../mock-base.json");

exports.get = async (req, res, next) => {
  try {
    validationResult(req).throw();
    let cpf = req.headers.cpf.replace(/[^\d]+/g, "");

    let result = mockbase[cpf];

    res.status(200).send(result ? result : { message: "cpf não encontrado" });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição: ",
      detail: e.array()
    });
  }
};
