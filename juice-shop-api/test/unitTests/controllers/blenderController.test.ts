import chai = require("chai");
import * as fetchMock from "fetch-mock";
import * as sinon from "sinon";
import * as supertest from "supertest";
import { httpServer as server } from "../../../app/app";
import { settings } from "../../../app/config/config";
import { logger } from "../../../app/services/logger";

describe("blender controller", () => {
	const expect = chai.expect;
	const sandbox = sinon.createSandbox();
	let logInfoStub: sinon.SinonStub;

	beforeEach(() => {
		logInfoStub = sandbox.stub(logger, "info");
		sandbox.stub(settings, "fruits_api").value("http://localhost");
	});

	afterEach(() => {
		sandbox.restore();
		fetchMock.reset();
	});

	it("should return juice with total charge", done => {
		fetchMock.mock("http://localhost/api/fruits/au/mango/price", {
			status: 200,
			body: {
				price: 5.0
			}
		});
		fetchMock.mock("http://localhost/api/fruits/au/apple/price", {
			status: 200,
			body: {
				price: 6.0
			}
		});

		supertest(server)
			.post("/api/juice-shop/blender")
			.send({ fruits: ["mango", "apple"] })
			.set("Accept", "application/json")
			.set("country", "au")
			.end((err: any, response: supertest.Response) => {
				if (err) {
					done(err);
				} else {
					expect(response.status).to.equal(200);
					expect(response.text).to.equal(
						JSON.stringify({
							juice: "mango-apple juice",
							price: 11
						})
					);
					expect(logInfoStub.callCount).to.equal(1);
					done();
				}
			});
	});

	it("should return invalid fruit message for not found response", done => {
		fetchMock.mock("http://localhost/api/fruits/au/mango/price", {
			status: 404,
			body: {}
		});

		supertest(server)
			.post("/api/juice-shop/blender")
			.send({ fruits: ["mango", "apple"] })
			.set("Accept", "application/json")
			.set("country", "au")
			.end((err: any, response: supertest.Response) => {
				if (err) {
					done(err);
				} else {
					expect(response.status).to.equal(409);
					expect(response.text).to.equal(
						JSON.stringify({
							code: "InvalidArgument",
							message: "please only select fruits available in your region"
						})
					);
					expect(logInfoStub.callCount).to.equal(1);
					done();
				}
			});
	});
});
