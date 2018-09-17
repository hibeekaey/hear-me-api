/*!
 * deafhear-api
 * Copyright (c) 2018 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import express from "express";
import auth from "../lib/auth"; // import authentication module
import speech from "../lib/speech-recognition"; // import speech recognition module

// use express router
const router = express.Router();

// define the speech route
router.post("/", auth, speech, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "speech recognition operation completed",
    data: res.locals.transcription // text output
  });
});
 
// set up a router and export
export default router;