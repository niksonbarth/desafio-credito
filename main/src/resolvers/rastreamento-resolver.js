"use strict";

const rastreamento = require("../providers/rastreamento-provider");
const redisClient = require("../redis-client");

exports.resolvers = {
  async consulta_rastreamento({ login, senha, cpf }) {
    let result_rastreamento = await redisClient.getAsync("rastreamento:" + cpf);
    if (!result_rastreamento) {
      let result_login = await rastreamento.login(login, senha);
      if (result_login.token) {
        result_rastreamento = await rastreamento.get(cpf, result_login.token);
        result_rastreamento["cpf"] = cpf;

        redisClient.setAsync(
          "rastreamento:" + cpf,
          JSON.stringify(result_rastreamento),
          "EX",
          300
        );
      }
    } else {
      result_rastreamento = JSON.parse(result_rastreamento);
    }

    return result_rastreamento;
  }
};
