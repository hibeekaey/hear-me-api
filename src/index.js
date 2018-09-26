/*!
 * deafhear-api
 * Copyright (c) 2018 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import "regenerator-runtime/runtime";

import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import morgan from "morgan";
import dotenv from "dotenv";
import rfs from "rotating-file-stream";
import { mount } from "./routes";

// use .env
dotenv.config();

// initialize app
let app = express();

// for testing
app.get("/", (req, res) => {
  res.send("Hooray!");
});

// public directory
app.use(express.static(`${process.cwd()}/public`));

let logDirectory = `${process.cwd()}/logs`; // log directory
 
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = rfs("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log only 4xx and 5xx responses to console
app.use(morgan("dev", {
  skip: (req, res) => res.statusCode < 400
}));

// log all requests to access.log
app.use(morgan("common", { stream: accessLogStream }));

// use app routes
mount(app);

// listen to the app on port process.env.PORT
app.listen(process.env.PORT);

export default app; // export app entry point