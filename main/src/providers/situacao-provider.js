"use strict";

const axios = require("axios");

const api = axios.create({
  baseURL: `http://basea:3000`
});

class Situacao {
  async login(login, senha) {
    return api
      .post("/login", {
        login: login,
        senha: senha
      })
      .then(function(response) {
        return {
          token: response.data.token,
          msg: response.data.message
        };
      })
      .catch(function(error) {
        let msg = "Servidor não encontrado";
        if (error.response && error.response.data) {
          msg = error.response.data.message;
        }

        return {
          token: null,
          msg: msg
        };
      });
  }

  async get(cpf, token) {
    return api
      .get("/situacaofinanceira", {
        headers: {
          cpf: cpf,
          token: token
        }
      })
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        return error.response.data.message;
      });
  }
}

const situacao = new Situacao();

module.exports = situacao;
