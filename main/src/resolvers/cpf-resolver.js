"use strict";

const situacao = require("./situacao-resolver");
const bensrenda = require("./bensrenda-resolver");
const rastreamento = require("./rastreamento-resolver");

exports.resolvers = {
  async consultar_cpf({ login, senha, cpf }) {
    return {
      situacao: situacao.resolvers.consulta_situacao({ login, senha, cpf }),
      bens_renda: bensrenda.resolvers.consulta_bensrenda({ login, senha, cpf }),
      rastreamento: rastreamento.resolvers.consulta_rastreamento({
        login,
        senha,
        cpf
      })
    };
  }
};
