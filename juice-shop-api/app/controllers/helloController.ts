import * as restify from "restify";

export default class HelloController {
	public async getGreeting(
		req: restify.Request,
		res: restify.Response,
		next: restify.Next
	) {
		res.sendRaw(200, "Welcome to the Juice Shop!");
		return next();
	}

	public async feelingLucky(
		req: restify.Request,
		res: restify.Response,
		next: restify.Next
	) {
		const outcome = Math.random() <= 0.8;
		res.sendRaw(
			outcome ? 500 : 200,
			outcome ? "Better luck next time" : "Lucky"
		);
		return next();
	}
}
