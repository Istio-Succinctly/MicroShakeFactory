import * as restify from "restify";
import FruitsController from "../controllers/fruitsController";

module.exports.routes = function fruitsRoute(api: restify.Server) {
	const routeCtrl = new FruitsController();
	api.get("/api/fruits/:country", routeCtrl.getSeasonalFruitsByCountry);
	api.get("/api/fruits/:country/:name/price", routeCtrl.getPrice);
};
