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
import tts from "../lib/text-to-speech"; // import text-to-speech module

// use express router
const router = express.Router();

// define the text route
router.post("/", auth, tts, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "text-to-speech operation completed",
    data: res.locals.speech // mp3 output url
  });
});
 
// set up a router and export
export default router;