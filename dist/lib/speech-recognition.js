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
  if (req.body.voice && req.body.language) {
    // check if voice is in request body
    // the audio file's encoding, sample rate in hertz, and BCP-47 language code
    // todo convert the received m4a file to wav
    var audioWav = req.body.voice.toWav();

    var request = {
      audio: {
        content: audioWav
      },
      config: {
        languageCode: req.body.language
      }
    };

    // detects speech in the audio file
    client.recognize(request).then(function (data) {
      var response = data[0];
      res.locals.transcription = response.results.map(function (result) {
        return result.alternatives[0].transcript;
      }).join("\n");

      next();
    }).catch(function (err) {
      res.status(400).json({
        status: "error",
        message: "speech recognition operation failed"
      });
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "invalid request"
    });
  }
};

var _speech = require("@google-cloud/speech");

var _speech2 = _interopRequireDefault(_speech);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// creates a client
var client = new _speech2.default.SpeechClient();

// set up a speech recognition model and export
// google cloud client library