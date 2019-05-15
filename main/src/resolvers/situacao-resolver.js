"use strict";

const situacao = require("../providers/situacao-provider");
const redisClient = require("../redis-client");

exports.resolvers = {
  async consulta_situacao({ login, senha, cpf }) {
    let situacao_financeira = await redisClient.getAsync("situacao:" + cpf);
    if (!situacao_financeira) {
      let result_login = await situacao.login(login, senha);
      if (result_login.token) {
        situacao_financeira = await situacao.get(cpf, result_login.token);
        situacao_financeira["cpf"] = cpf;

        redisClient.setAsync(
          "situacao:" + cpf,
          JSON.stringify(situacao_financeira),
          "EX",
          300
        );
      }
    } else {
      situacao_financeira = JSON.parse(situacao_financeira);
    }

    return situacao_financeira;
  }
};
