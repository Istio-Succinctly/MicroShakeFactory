import * as restify from "restify";
import ExoticFruitsController from "../controllers/exoticFruitsController";

module.exports.routes = function exoticFruitsRoute(api: restify.Server) {
	const routeCtrl = new ExoticFruitsController();
	api.get("/api/juice-shop/exoticFruits", routeCtrl.getExoticFruits);
};
