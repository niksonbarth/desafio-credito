"use strict";

const bensrenda = require("../providers/bensrenda-provider");
const redisClient = require("../redis-client");

exports.resolvers = {
  async consulta_bensrenda({ login, senha, cpf }) {
    let result_bensrenda = await redisClient.getAsync("bensrenda:" + cpf);
    if (!result_bensrenda) {
      let result_login = await bensrenda.login(login, senha);
      if (result_login.token) {
        result_bensrenda = await bensrenda.get(cpf, result_login.token);
        result_bensrenda["cpf"] = cpf;

        redisClient.setAsync(
          "bensrenda:" + cpf,
          JSON.stringify(result_bensrenda),
          "EX",
          300
        );
      }
    } else {
      result_bensrenda = JSON.parse(result_bensrenda);
    }

    return result_bensrenda;
  }
};
