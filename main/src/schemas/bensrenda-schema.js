"use strict";

const BensRenda = `
  type Bem {
    descricao: String,
    valor: Float
  }
  type Renda {
    empresa_nome: String
    empresa_cnpj: String
    salario: Float
  }
  type BensRenda {
    idade: Int
    lista_bens: [Bem]
    endereco: Endereco
    renda: Renda
  }
`;

module.exports = BensRenda;
