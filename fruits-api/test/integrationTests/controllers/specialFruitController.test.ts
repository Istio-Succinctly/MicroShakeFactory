import chai = require("chai");
import * as supertest from "supertest";
import { api as server } from "../../../app/app";

const expect = chai.expect;

describe("special fruit endpoint", () => {
	it("should return Mango for version 1", done => {
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
					done();
				}
			});
	});
});
