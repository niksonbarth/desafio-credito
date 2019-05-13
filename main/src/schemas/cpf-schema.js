"use strict";

const { buildSchema } = require("graphql");

const situacaoSchema = require("./situacao-schema");
const bensrendaSchema = require("./bensrenda-schema");
const enderecoSchema = require("./endereco-schema");
const rastreamentoSchema = require("./rastreamento-schema");

const Cpf = `
  type Cpf {
    situacao: SituacaoFinanceira
    bens_renda: BensRenda
    rastreamento: Rastreamento
  }
  type Query {
    consultar_cpf(login: String!, senha: String!, cpf: String!): Cpf
  }
`;

module.exports = buildSchema(
  enderecoSchema + situacaoSchema + bensrendaSchema + rastreamentoSchema + Cpf
);
