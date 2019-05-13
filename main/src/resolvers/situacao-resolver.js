"use strict";

const situacao = require("../providers/situacao-provider");

exports.resolvers = {
  async consulta_situacao({ login, senha, cpf }) {
    let result_login = await situacao.login(login, senha);
    let situacao_financeira = null;
    if (result_login.token) {
      situacao_financeira = await situacao.get(cpf, result_login.token);
      situacao_financeira["cpf"] = cpf;
    }

    return situacao_financeira;
  }
};
