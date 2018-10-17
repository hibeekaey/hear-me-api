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

exports.default = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    // check if token exists
    _jsonwebtoken2.default.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        res.status(401).json({
          status: "error",
          message: "failed to authenticate token"
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next(); // proceed to the next middleware
      }
    });
  } else if (req.body.username && req.body.password) {
    // authenticate user
    // todo

    // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    var payload = {
      username: req.body.username
    };

    var _token = _jsonwebtoken2.default.sign(payload, process.env.SECRET, {
      expiresIn: "24h" // expires in 24 hours,
    });

    res.status(200).json({
      status: "success",
      message: "user authentication completed",
      token: _token
    });
  } else {
    // response if token not found
    next();
    return;
    // res.status(401).json({
    //   status: "error",
    //   message: "user authentication required"
    // });
  }
};

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }