import chai = require("chai");
import * as supertest from "supertest";
import { httpServer as server } from "../../../app/app";

describe("hello controller", () => {
	const expect = chai.expect;

	it("should return greeting when invoked", done => {
		supertest(server)
			.get("/api/juice-shop/hello")
			.end((err: any, response: supertest.Response) => {
				if (err) {
					done(err);
				} else {
					expect(response.status).to.equal(200);
					expect(response.text).to.equal("Welcome to the Juice Shop!");
					done();
				}
			});
	});

	it("should return status code 200 or 500 when testMyLuck is invoked", done => {
		supertest(server)
			.get("/api/juice-shop/testMyLuck")
			.end((err: any, response: supertest.Response) => {
				if (err) {
					done(err);
				} else {
					expect(response.status).to.be.oneOf([200, 500]);
					expect(response.text).to.be.oneOf(["Better luck next time", "Lucky"]);
					done();
				}
			});
	});
});
