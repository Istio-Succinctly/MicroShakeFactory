import chai = require("chai");
import * as sinon from "sinon";
import * as supertest from "supertest";
import { api as server } from "../../../app/app";
import { settings } from "../../../app/config/config";
import { logger } from "../../../app/services/logger";

describe("special fruit controller", () => {
  const expect = chai.expect;
  const sandbox = sinon.createSandbox();
  let settingsStub: sinon.SinonStub;
  let logInfoStub: sinon.SinonStub;

  beforeEach(() => {
    logInfoStub = sandbox.stub(logger, "info");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should return Mango if version is 1", done => {
    supertest(server)
      .get("/api/fruits/special")
      .end((err: any, response: supertest.Response) => {
        if (err) {
          done(err);
        } else {
          expect(response.status).to.equal(200);
          expect(response.text).to.equal(
            JSON.stringify({ ver: "1", fruit: "Mango" })
          );
          expect(logInfoStub.callCount).to.equal(1);
          done();
        }
      });
  });

  it("should return Orange if version is not 1", done => {
    settingsStub = sandbox.stub(settings, "version").value("2");
    supertest(server)
      .get("/api/fruits/special")
      .end((err: any, response: supertest.Response) => {
        if (err) {
          done(err);
        } else {
          expect(response.status).to.equal(200);
          expect(response.text).to.equal(
            JSON.stringify({ ver: "2", fruit: "Orange" })
          );
          expect(logInfoStub.callCount).to.equal(1);
          done();
        }
      });
  });
});
