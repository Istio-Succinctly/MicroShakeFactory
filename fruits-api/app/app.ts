import * as fs from "fs";
import * as restify from "restify";
import * as corsMiddleware from "restify-cors-middleware";
import { settings } from "./config/config";
import { logger } from "./services/logger";

export let api = restify.createServer({
	name: settings.name
});

const cors = corsMiddleware({
	preflightMaxAge: 5,
	origins: ["*"],
	allowHeaders: ["x-api-key"],
	exposeHeaders: ["x-api-key-expiry"]
});

api.pre(cors.preflight);
api.use(cors.actual);
api.use(
	restify.plugins.requestLogger({
		log: logger,
		serializers: restify.bunyan.serializers
	})
);
api.pre(restify.pre.sanitizePath());
api.use(restify.plugins.acceptParser(api.acceptable));
api.use(restify.plugins.bodyParser());
api.use(restify.plugins.queryParser());
api.use(restify.plugins.authorizationParser());
api.use(restify.plugins.fullResponse());

fs.readdirSync(__dirname + "/routes").forEach((routeConfig: string) => {
	if (routeConfig.substr(-3) === ".js") {
		const route = require(__dirname + "/routes/" + routeConfig);
		route.routes(api);
	}
});

api.listen(settings.port, () => {
	logger.info(`INFO: ${settings.name} is running at ${api.url}`);
});
