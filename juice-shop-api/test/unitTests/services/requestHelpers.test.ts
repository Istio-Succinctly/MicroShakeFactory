import chai = require("chai");
import * as requestHelper from "../../../app/services/requestHelpers";

describe("request helper", () => {
	const expect = chai.expect;

	it("should return no trace headers if none match", done => {
		// tslint:disable-next-line: one-variable-per-declaration
		const req: any = {
			headers: {
				["version"]: "1",
				["source"]: "unit test"
			}
		};

		const traceHeaders = requestHelper.getTraceHeaders(req);
		// tslint:disable: no-unused-expression
		expect(traceHeaders.has("x-request-id")).to.be.false;
		expect(traceHeaders.has("x-b3-traceid")).to.be.false;
		expect(traceHeaders.has("x-b3-spanid")).to.be.false;
		expect(traceHeaders.has("x-b3-parentspanid")).to.be.false;
		expect(traceHeaders.has("x-b3-flags")).to.be.false;
		expect(traceHeaders.has("x-b3-sampled")).to.be.false;
		expect(traceHeaders.has("x-ot-span-context")).to.be.false;
		done();
	});

	it("should return a header if one match", done => {
		// tslint:disable-next-line: one-variable-per-declaration
		const req: any = {
			headers: {
				["x-request-id"]: "1",
				["source"]: "unit test"
			}
		};

		const traceHeaders = requestHelper.getTraceHeaders(req);
		// tslint:disable: no-unused-expression
		expect(traceHeaders.has("x-request-id")).to.be.true;
		expect(traceHeaders.get("x-request-id")).to.equal("1");
		expect(traceHeaders.has("x-b3-traceid")).to.be.false;
		expect(traceHeaders.has("x-b3-spanid")).to.be.false;
		expect(traceHeaders.has("x-b3-parentspanid")).to.be.false;
		expect(traceHeaders.has("x-b3-flags")).to.be.false;
		expect(traceHeaders.has("x-b3-sampled")).to.be.false;
		expect(traceHeaders.has("x-ot-span-context")).to.be.false;
		done();
	});
});
