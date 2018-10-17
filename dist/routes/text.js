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

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _auth = require("../lib/auth");

var _auth2 = _interopRequireDefault(_auth);

var _textToSpeech = require("../lib/text-to-speech");

var _textToSpeech2 = _interopRequireDefault(_textToSpeech);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import text-to-speech module

// use express router
var router = _express2.default.Router();

// define the text route
// import authentication module
router.post("/", _auth2.default, _textToSpeech2.default, function (req, res) {
  res.status(200).json({
    status: "success",
    message: "text-to-speech operation completed",
    data: res.locals.speech // mp3 output url
  });
});

// set up a router and export
exports.default = router;