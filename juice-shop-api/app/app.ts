import * as fs from "fs";
import * as restify from "restify";
import * as corsMiddleware from "restify-cors-middleware";
import { settings } from "./config/config";
import { logger } from "./services/logger";

const serverOptions: restify.ServerOptions = {
	name: settings.name,
	key: fs.readFileSync(settings.certificateKeyPath),
	certificate: fs.readFileSync(settings.certificatePath)
};

export let httpsServer = restify.createServer(serverOptions);
export let httpServer = restify.createServer({ name: settings.name });

const cors = corsMiddleware({
	preflightMaxAge: 5,
	origins: ["*"],
	allowHeaders: ["x-api-key"],
	exposeHeaders: ["x-api-key-expiry"]
});

composeServer(httpServer);
composeServer(httpsServer);

httpServer.listen(settings.port, () => {
	logger.info(`INFO: ${settings.name} is running at ${httpServer.url}`);
});

httpsServer.listen(settings.httpsPort, () => {
	logger.info(`INFO: ${settings.name} is running at ${httpsServer.url}`);
});

function composeServer(server: restify.Server) {
	server.pre(cors.preflight);
	server.use(cors.actual);
	server.use(
		restify.plugins.requestLogger({
			log: logger,
			serializers: restify.bunyan.serializers
		})
	);
	server.pre(restify.pre.sanitizePath());
	server.use(restify.plugins.acceptParser(server.acceptable));
	server.use(restify.plugins.bodyParser());
	server.use(restify.plugins.queryParser());
	server.use(restify.plugins.authorizationParser());
	server.use(restify.plugins.fullResponse());

	fs.readdirSync(__dirname + "/routes").forEach((routeConfig: string) => {
		if (routeConfig.substr(-3) === ".js") {
			const route = require(__dirname + "/routes/" + routeConfig);
			route.routes(server);
		}
	});
}
