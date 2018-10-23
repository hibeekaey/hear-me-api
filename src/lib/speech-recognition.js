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
import fs from "fs";

// creates a client
const client = new speech.SpeechClient();

// set up a speech recognition model and export
export default function (req, res, next) {
  if (req.body.voice && req.body.language) { // check if voice is in request body
    // the audio file's encoding, sample rate in hertz, and BCP-47 language code
    let request = {
      audio: {
        content: req.body.voice,
      },
      config: {
        encoding: "AMR_WB",
        sampleRateHertz: 16000,
        languageCode: req.body.language,
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
  } else {
    res.status(400).json({
      status: "error",
      message: "invalid request"
    });
  }
}
