import chai = require("chai");
import * as fetchMock from "fetch-mock";
import * as sinon from "sinon";
import * as supertest from "supertest";
import { httpServer as server } from "../../../app/app";
import { settings } from "../../../app/config/config";
import { logger } from "../../../app/services/logger";

describe("exotic fruits controller", () => {
	const expect = chai.expect;
	const sandbox = sinon.createSandbox();
	let logInfoStub: sinon.SinonStub;

	beforeEach(() => {
		logInfoStub = sandbox.stub(logger, "info");
		sandbox.stub(settings, "exoticFruits_api").value("http://localhost");
	});

	afterEach(() => {
		sandbox.restore();
		fetchMock.reset();
	});

	it("should return fruits when external service is accessible", done => {
		fetchMock.mock("http://localhost", {
			status: 200,
			body: {
				fruits: ["strawberry", "peach"]
			}
		});

		supertest(server)
			.get("/api/juice-shop/exoticFruits")
			.end((err: any, response: supertest.Response) => {
				if (err) {
					done(err);
				} else {
					expect(response.status).to.equal(200);
					expect(response.text).to.equal(
						JSON.stringify({ fruits: ["strawberry", "peach"] })
					);
					expect(logInfoStub.callCount).to.equal(1);
					expect(logInfoStub.args[0].toString()).to.equal(
						"fetching exotic fruits from http://localhost"
					);
					done();
				}
			});
	});

	it("should return error when external service is not accessible", done => {
		fetchMock.mock("http://localhost", {
			status: 404,
			body: {}
		});

		supertest(server)
			.get("/api/juice-shop/exoticFruits")
			.end((err: any, response: supertest.Response) => {
				if (err) {
					done(err);
				} else {
					expect(response.status).to.equal(409);
					expect(response.text).to.equal(
						JSON.stringify({
							code: "InvalidArgument",
							message: "Exotic fruits are not available"
						})
					);
					expect(logInfoStub.callCount).to.equal(1);
					expect(logInfoStub.args[0].toString()).to.equal(
						"fetching exotic fruits from http://localhost"
					);
					done();
				}
			});
	});
});
