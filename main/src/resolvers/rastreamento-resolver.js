"use strict";

const rastreamento = require("../providers/rastreamento-provider");

exports.resolvers = {
  async consulta_rastreamento({ login, senha, cpf }) {
    let result_login = await rastreamento.login(login, senha);
    let result_rastreamento = null;
    if (result_login.token) {
      result_rastreamento = await rastreamento.get(cpf, result_login.token);
      result_rastreamento["cpf"] = cpf;
    }

    return result_rastreamento;
  }
};
