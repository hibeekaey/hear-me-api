/*!
 * deafhear-api
 * Copyright (c) 2018 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import jimp from "jimp";
import uuid from "uuid/v1"; // timestamp uuid
import url from "url";

// set up a thumbnail model and export
export default function (req, res, next) {
  if (req.body.public_url) {
    // open the file in the public url
    jimp.read(req.body.public_url, (err, image) => {
      if (err) { // jimp failed
        res.status(400).json({
          status: "error",
          message: "image thumbnail creation failed"
        });
      } else {
        // filepath for image thumbnail
        let filename = `${uuid()}.${image.getExtension()}`;
        let filepath = `${process.cwd()}/public/imgs/${filename}`;
        
        // set up thumbnail public url
        let origin = url.format({ // format origin
          protocol: req.protocol,
          host: req.get("host")
        });
        
        image.cover(50, 50) // resize to 50x50 pixels keeping aspect ratio
          .write(filepath); // save to public url locally
          
        // add thumbnail url to request
        let thumbnail = `${origin}/imgs/${filename}`;
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
}