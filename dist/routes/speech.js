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

var _speechRecognition = require("../lib/speech-recognition");

var _speechRecognition2 = _interopRequireDefault(_speechRecognition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import speech recognition module

// use express router
var router = _express2.default.Router();

// define the speech route
// import authentication module
router.post("/", _auth2.default, _speechRecognition2.default, function (req, res) {
  res.status(200).json({
    status: "success",
    message: "speech recognition operation completed",
    data: res.locals.transcription // text output
  });
});

// set up a router and export
exports.default = router;