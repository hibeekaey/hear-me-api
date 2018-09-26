/*!
 * deafhear-api
 * Copyright (c) 2018 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import speech from "@google-cloud/speech"; // google cloud client library
import request from "request";

// creates a client
const client = new speech.SpeechClient();

// set up a speech recognition model and export
export default function (req, res, next) {
  if (req.body.voice) { // check if voice is in request body
    request.get({ url: req.body.voice, encoding: "base64" }, (err, resp, audioBytes) => {
      if (err) {
        res.status(400).json({
          status: "error",
          message: "audio file read operation failed"
        });
      } else {
        // the audio file's encoding, sample rate in hertz, and BCP-47 language code
        let request = {
          audio: {
            content: audioBytes,
          },
          config: {
            encoding: "LINEAR16",
            sampleRateHertz: 16000,
            languageCode: "en-GB",
          },
        };

        // detects speech in the audio file
        client.recognize(request).then(data => {
          let response = data[0];
          res.locals.transcription = response.results.map(result => result.alternatives[0].transcript).join("\n");
          
          next();
        }).catch(err => {
          res.status(400).json({
            status: "error",
            message: "speech recognition operation failed"
          });
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