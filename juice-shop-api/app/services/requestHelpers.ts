import * as restify from "restify";

export function getTraceHeaders(req: restify.Request): Headers {
	const requestHeaders = new Headers();
	setIfAvailable("x-request-id");
	setIfAvailable("x-b3-traceid");
	setIfAvailable("x-b3-spanid");
	setIfAvailable("x-b3-parentspanid");
	setIfAvailable("x-b3-flags");
	setIfAvailable("x-b3-sampled");
	setIfAvailable("x-ot-span-context");
	return requestHeaders;

	function setIfAvailable(headerName: string) {
		const headerValue = req.headers[headerName];
		if (headerValue) {
			requestHeaders.set(headerName, headerValue as string);
		}
	}
}
