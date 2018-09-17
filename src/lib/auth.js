/*!
 * deafhear-api
 * Copyright (c) 2018 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import jwt from "jsonwebtoken"; // used to create, sign, and verify tokens

// set up a authentication model and export
export default function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers["x-access-token"];
  
  if (token) { // check if token exists
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: "error",
          message: "failed to authenticate token"
        });
      }
      else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next(); // proceed to the next middleware
      }
    });
  }
  else if (req.body.username && req.body.password) { // authenticate user
    // todo

    // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    const payload = {
      username: req.body.username
    };
    
    let token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "24h" // expires in 24 hours,
    });

    res.status(200).json({
      status: "success",
      message: "user authentication completed",
      token: token
    });
  }
  else { next(); return; // response if token not found
    res.status(401).json({
      status: "error",
      message: "user authentication required"
    });
  }
}