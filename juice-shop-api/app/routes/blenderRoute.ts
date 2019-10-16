import * as restify from "restify";
import BlenderController from "../controllers/blenderController";

module.exports.routes = function blenderRoute(api: restify.Server) {
	const routeCtrl = new BlenderController();
	api.post(
		"/api/juice-shop/blender",
		async (
			req: restify.Request,
			res: restify.Response,
			next: restify.Next
		): Promise<void> => {
			await routeCtrl.blend(req, res, next);
		}
	);
};
