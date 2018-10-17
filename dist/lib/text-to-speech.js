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
  if (req.body.text && req.body.language) {
    // check if text is in request body
    // prepare request body
    var request = {
      input: { text: req.body.text },
      // set the language and SSML Voice Gender (optional)
      voice: { languageCode: req.body.language, ssmlGender: "FEMALE" },
      // set the type of audio encoding
      audioConfig: { audioEncoding: "MP3" }
    };

    // performs the Text-to-Speech request
    client.synthesizeSpeech(request, function (err, response) {
      if (err) {
        res.status(400).json({
          status: "error",
          message: "text-to-speech operation failed"
        });
      } else {
        // filepath for audio content
        var filename = (0, _v2.default)() + ".mp3";
        var filepath = process.cwd() + "/public/audios/" + filename;

        // write the binary audio content to a local file
        _fs2.default.writeFile(filepath, response.audioContent, "binary", function (err) {
          if (err) {
            res.status(400).json({
              status: "error",
              message: "audio file write operation failed"
            });
          } else {
            // set up audio content public url
            var origin = _url2.default.format({ // format origin
              protocol: req.protocol,
              host: req.get("host")
            });

            // add audio content url to request
            var speech = origin + "/audios/" + filename;
            res.locals.speech = speech;

            next(); // next middleware
          }
        });
      }
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "invalid request"
    });
  }
};

var _textToSpeech = require("@google-cloud/text-to-speech");

var _textToSpeech2 = _interopRequireDefault(_textToSpeech);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _v = require("uuid/v1");

var _v2 = _interopRequireDefault(_v);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// creates a client
var client = new _textToSpeech2.default.TextToSpeechClient();

// set up a text-to-speech model and export
// timestamp uuid
// google cloud client library