/*!
 * deafhear-api
 * Copyright (c) 2018 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("regenerator-runtime/runtime");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _rotatingFileStream = require("rotating-file-stream");

var _rotatingFileStream2 = _interopRequireDefault(_rotatingFileStream);

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// use .env
_dotenv2.default.config();

// initialize app
var app = (0, _express2.default)();

// public directory
app.use(_express2.default.static(process.cwd() + "/public"));

var logDirectory = process.cwd() + "/logs"; // log directory

// ensure log directory exists
_fs2.default.existsSync(logDirectory) || _fs2.default.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = (0, _rotatingFileStream2.default)("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory
});

// use body parser so we can get info from POST and/or URL parameters
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

// log only 4xx and 5xx responses to console
app.use((0, _morgan2.default)("dev", {
  skip: function skip(req, res) {
    return res.statusCode < 400;
  }
}));

// log all requests to access.log
app.use((0, _morgan2.default)("common", { stream: accessLogStream }));

// enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Headers", "Content-Type, Range");
  res.header("Access-Control-Expose-Headers", "Accept-Ranges, Content-Encoding, Content-Length, Content-Range");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("*", function (req, res) {
  res.send(201);
});

// for testing
app.get("/", function (req, res) {
  res.send("Hooray!");
});

// use app routes
(0, _routes.mount)(app);

// listen to the app on port process.env.PORT
app.listen(process.env.PORT);

exports.default = app; // export app entry point