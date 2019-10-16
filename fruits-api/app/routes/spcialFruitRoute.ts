import * as restify from "restify";
import SpecialFruitController from "../controllers/specialFruitController";

module.exports.routes = function specialFruitRoute(api: restify.Server) {
	const routeCtrl = new SpecialFruitController();
	api.get("/api/fruits/special", routeCtrl.getSpecialFruit);
};
