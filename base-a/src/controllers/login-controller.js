"use strict";

const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    validationResult(req).throw();

    if (req.body.login != "admin" || req.body.senha != "segredo") {
      res.status(401).send({
        message: "Falha na autenticação"
      });
    } else {
      let login = req.body.login;
      let token = jwt.sign({ login }, process.env.TOKEN_KEY, {
        expiresIn: 300
      });

      res.status(200).send({
        message: "Autenticação realizada com sucesso",
        token: token
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Falha ao processar sua requisição ",
      detail: typeof e.array === "function" ? e.array() : e
    });
  }
};
