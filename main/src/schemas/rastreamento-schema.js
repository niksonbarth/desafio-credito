"use strict";

const Rastreamento = `
  type UltimaConsulta {
    data: String
    empresa_nome: String
    empresa_cnpj: String
  }
  type Movimentacao {
    tipo: String
    valor: Float
    empresa_nome: String
  }
  type UltimaCompraCredito {
    data: String
    valor: Float
  },
  type Rastreamento {
    ultima_consulta: UltimaConsulta
    movimentacao: Movimentacao
    ultima_compra_credito: UltimaCompraCredito
  }
`;

module.exports = Rastreamento;
