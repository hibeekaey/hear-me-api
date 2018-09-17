/*!
 * deafhear-api
 * Copyright (c) 2018 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import textToSpeech from "@google-cloud/text-to-speech"; // google cloud client library
import fs from "fs";
import uuid from "uuid/v1"; // timestamp uuid
import url from "url";

// creates a client
const client = new textToSpeech.TextToSpeechClient();

// set up a text-to-speech model and export
export default function (req, res, next) {
  if (req.body.text) { // check if text is in request body
    // prepare request body
    let request = {
      input: { text: req.body.text },
      // set the language and SSML Voice Gender (optional)
      voice: {languageCode: 'en-GB', ssmlGender: 'FEMALE'},
      // set the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'}
    };

    // performs the Text-to-Speech request
    client.synthesizeSpeech(request, (err, response) => {
      if (err) {
        res.status(400).json({
          status: "error",
          message: "text-to-speech operation failed"
        });
      } else {
        // filepath for audio content
        let filename = `${uuid()}.mp3`;
        let filepath = `${process.cwd()}/public/audios/${filename}`;
        
        // write the binary audio content to a local file
        fs.writeFile(filepath, response.audioContent, 'binary', err => {
          if (err) {
            res.status(400).json({
              status: "error",
              message: "audio file write operation failed"
            });
          } else {
            // set up audio content public url
            let origin = url.format({ // format origin
              protocol: req.protocol,
              host: req.get("host")
            });

            // add audio content url to request
            let speech = `${origin}/audios/${filename}`;
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
}
