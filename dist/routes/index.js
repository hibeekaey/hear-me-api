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
exports.mount = mount;

var _login = require("./login");

var _login2 = _interopRequireDefault(_login);

var _user = require("./user");

var _user2 = _interopRequireDefault(_user);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

var _speech = require("./speech");

var _speech2 = _interopRequireDefault(_speech);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// set up a route index model and export
function mount(app) {
  app.use("/login", _login2.default); // login route
  app.use("/user", _user2.default); // user route
  app.use("/text", _text2.default); // text route
  app.use("/speech", _speech2.default); // speech route
}