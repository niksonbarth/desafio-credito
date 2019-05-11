"use strict";

const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const config = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const router = express.Router();

const loginRoute = require("./routes/login-route");
const situacaoRoute = require("./routes/situacao-route");

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

app.use("/", loginRoute);
app.use("/", situacaoRoute);

module.exports = app;