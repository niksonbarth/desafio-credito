"use strict";

const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const expressGraphql = require("express-graphql");

const schema = require("./schemas/cpf-schema");
const cpfResolver = require("./resolvers/cpf-resolver");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(morgan());

// const whitelist = ["http://localhost:8080"];
// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

app.use(cors("*"));
app.use(morgan("combined"));

app.use(
  "/graphql",
  expressGraphql({
    schema,
    rootValue: cpfResolver.resolvers,
    graphiql: true
  })
);

module.exports = app;
