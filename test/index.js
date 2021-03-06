/*!
 * deafhear-api
 * Copyright (c) 2018 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import chai from "chai";
import chaiHttp from "chai-http";

import server from "../src/index"; // server entry point

// set up chai
const should = chai.should();

chai.use(chaiHttp);

describe("DeafHear API", () => {
  let token;
  
  /**
   * Test for active server
   */

  describe("Server", () => {
    it("it should return 200", done => {
      chai.request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});