"use strict";

const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const loginRoute = require("./routes/login-route");
const bensRoute = require("./routes/bens-route");

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
app.use("/", bensRoute);

module.exports = app;
