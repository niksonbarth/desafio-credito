describe("#rastreamento", function() {
  const express = require("../src/app");
  const request = require("supertest")(express);

  process.env.TOKEN_KEY = "TESTE";

  it("#login_error", function(done) {
    request.post("/login").expect(500, done);
  });

  it("#login_fail", function(done) {
    request
      .post("/login")
      .send({ login: "admin", senha: "fail" })
      .expect(401, done);
  });

  it("#login_success", function(done) {
    request
      .post("/login")
      .send({ login: "admin", senha: "segredo" })
      .expect(200, done);
  });

  it("#login_success", function(done) {
    request
      .post("/login")
      .send({ login: "admin", senha: "segredo" })
      .expect(200, done);
  });

  it("#get_rastreamento_success", function(done) {
    request
      .post("/login")
      .send({ login: "admin", senha: "segredo" })
      .end(function(err, res) {
        console.log(res.body.token);
        request
          .get("/rastreamento")
          .set("cpf", "81922027049")
          .set("token", res.body.token)
          .expect(200, done);
      });
  });

  it("#get_rastreamento_fail", function(done) {
    request
      .post("/login")
      .send({ login: "admin", senha: "segredo" })
      .end(function(err, res) {
        console.log(res.body.token);
        request
          .get("/rastreamento")
          .set("cpf", "81922027049")
          .set("token", "000")
          .expect(500, done);
      });
  });
});
