"use strict";

const bensrenda = require("../providers/bensrenda-provider");

exports.resolvers = {
  async consulta_bensrenda({ login, senha, cpf }) {
    let result_login = await bensrenda.login(login, senha);
    let result_bensrenda = null;
    if (result_login.token) {
      result_bensrenda = await bensrenda.get(cpf, result_login.token);
      result_bensrenda["cpf"] = cpf;
    }

    return result_bensrenda;
  }
};
