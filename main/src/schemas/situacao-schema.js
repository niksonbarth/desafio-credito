"use strict";

const Situacao = `
  type Divida {
    credor_cnpj: String
    credor_nome: String
    valor: Float
  }
  type SituacaoFinanceira {
    cpf: String
    nome: String
    endereco: Endereco
    lista_divida: [Divida]
  }
`;

module.exports = Situacao;
