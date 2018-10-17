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
  if (req.body.public_url) {
    // open the file in the public url
    _jimp2.default.read(req.body.public_url, function (err, image) {
      if (err) {
        // jimp failed
        res.status(400).json({
          status: "error",
          message: "image thumbnail creation failed"
        });
      } else {
        // filepath for image thumbnail
        var filename = (0, _v2.default)() + "." + image.getExtension();
        var filepath = process.cwd() + "/public/imgs/" + filename;

        // set up thumbnail public url
        var origin = _url2.default.format({ // format origin
          protocol: req.protocol,
          host: req.get("host")
        });

        image.cover(50, 50) // resize to 50x50 pixels keeping aspect ratio
        .write(filepath); // save to public url locally

        // add thumbnail url to request
        var thumbnail = origin + "/imgs/" + filename;
        res.locals.thumbnail = thumbnail;

        next(); // next middleware
      }
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "invalid request"
    });
  }
};

var _jimp = require("jimp");

var _jimp2 = _interopRequireDefault(_jimp);

var _v = require("uuid/v1");

var _v2 = _interopRequireDefault(_v);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }