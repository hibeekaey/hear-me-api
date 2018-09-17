/*!
 * deafhear-api
 * Copyright (c) 2018 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import login from "./login";
import user from "./user";
import text from "./text";
import speech from "./speech";

// set up a route index model and export
export function mount(app) {
  app.use("/login", login); // login route
  app.use("/user", user); // user route
  app.use("/text", text); // text route
  app.use("/speech", speech); // speech route
}