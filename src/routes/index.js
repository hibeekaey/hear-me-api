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

// set up a route index model and pass it using module.exports
export function mount(app) {
  app.use("/login", login); // login route
  app.use("/user", user); // user route
}