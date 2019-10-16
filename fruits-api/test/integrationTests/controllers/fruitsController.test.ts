import chai = require("chai");
import * as supertest from "supertest";
import { api as server } from "../../../app/app";

const expect = chai.expect;

describe("fruits endpoint", () => {
	it("should return valid response for country usa", done => {
		supertest(server)
			.get("/api/fruits/usa")
			.end((err: any, response: supertest.Response) => {
				if (err) {
					done(err);
				} else {
					expect(response.status).to.equal(200);
					expect(response.text).to.equal(
						JSON.stringify({
							blueberry: 2.5,
							grape: 2.0,
							watermelon: 3.2,
							orange: 1.3
						})
					);
					done();
				}
			});
	});

	it("should return valid price response for country au", done => {
		supertest(server)
			.get("/api/fruits/au/kiwi/price")
			.end((err: any, response: supertest.Response) => {
				if (err) {
					done(err);
				} else {
					expect(response.status).to.equal(200);
					done();
				}
			});
	});
});
