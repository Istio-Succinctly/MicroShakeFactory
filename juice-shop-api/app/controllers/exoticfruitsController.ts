import "isomorphic-fetch";
import * as restify from "restify";
import { InternalServerError, InvalidArgumentError } from "restify-errors";
import { settings } from "../config/config";
import { logger } from "../services/logger";
import * as requestHelper from "../services/requestHelpers";

export default class ExoticFruitsController {
	public async getExoticFruits(
		req: restify.Request,
		res: restify.Response,
		next: restify.Next
	) {
		let response: any;
		const exoticFruitsApi: string = settings.exoticFruits_api;
		logger.info(`fetching exotic fruits from ${exoticFruitsApi}`);

		try {
			const apiResponse = await fetch(`${exoticFruitsApi}`, {
				headers: requestHelper.getTraceHeaders(req)
			});
			if (apiResponse.ok) {
				response = await apiResponse.json();
			} else {
				if (apiResponse.status === 404) {
					return next(
						new InvalidArgumentError("Exotic fruits are not available")
					);
				}
				return next(new InternalServerError("api call failed"));
			}
		} catch (err) {
			logger.error(err);
			return next(new Error(err));
		}

		res.json(200, response);
		return next();
	}
}
