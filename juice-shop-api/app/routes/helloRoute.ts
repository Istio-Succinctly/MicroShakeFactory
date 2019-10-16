import * as restify from "restify";
import HelloController from "../controllers/helloController";

module.exports.routes = function helloRoute(api: restify.Server) {
	const routeCtrl = new HelloController();
	api.get("/api/juice-shop/hello", routeCtrl.getGreeting);
	api.get("/api/juice-shop/testMyLuck", routeCtrl.feelingLucky);
};
