import chai = require("chai");
import * as sinon from "sinon";
import * as supertest from "supertest";
import { api as server } from "../../../app/app";
import { logger } from "../../../app/services/logger";

describe("fruits controller", () => {
  const expect = chai.expect;
  const sandbox = sinon.createSandbox();
  let logInfoStub: sinon.SinonStub;

  beforeEach(() => {
    logInfoStub = sandbox.stub(logger, "info");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should return fruits for country au", done => {
    supertest(server)
      .get("/api/fruits/au")
      .end((err: any, response: supertest.Response) => {
        if (err) {
          done(err);
        } else {
          expect(response.status).to.equal(200);
          expect(response.text).to.equal(
            JSON.stringify({
              nectarine: 2.5,
              mandarin: 2.3,
              lemon: 1.1,
              kiwi: 2.6
            })
          );
          expect(logInfoStub.callCount).to.equal(1);
          done();
        }
      });
  });

  it("should return not found for unsupported country", done => {
    supertest(server)
      .get("/api/fruits/notExists")
      .end((err: any, response: supertest.Response) => {
        if (err) {
          done(err);
        } else {
          expect(response.status).to.equal(404);
          expect(response.text).to.equal(
            JSON.stringify({
              code: "NotFound",
              message: "country not available"
            })
          );
          expect(logInfoStub.callCount).to.equal(1);
          done();
        }
      });
  });
});
