import * as restify from "restify";
import { NotFoundError } from "restify-errors";
import { logger } from "../services/logger";

const usaFruits: Record<string, number> = {
	blueberry: 2.5,
	grape: 2.0,
	watermelon: 3.2,
	orange: 1.3
};
const auFruits: Record<string, number> = {
	nectarine: 2.5,
	mandarin: 2.3,
	lemon: 1.1,
	kiwi: 2.6
};
const indFruits: Record<string, number> = {
	mango: 3.0,
	banana: 2.3,
	lychee: 1.4,
	apple: 2.0
};

export default class FruitsController {
	public getSeasonalFruitsByCountry(
		req: restify.Request,
		res: restify.Response,
		next: restify.Next
	) {
		logger.info(`list fruits request for ${req.params.country}`);
		let fruits: Record<string, number>;

		switch (req.params.country.toLowerCase()) {
			case "usa":
				fruits = usaFruits;
				break;
			case "au":
				fruits = auFruits;
				break;
			case "ind":
				fruits = indFruits;
				break;
			default:
				return next(new NotFoundError("country not available"));
		}

		res.json(200, fruits);
		return next();
	}

	public getPrice(
		req: restify.Request,
		res: restify.Response,
		next: restify.Next
	) {
		logger.info(`price request ${req.params.country} fruit ${req.params.name}`);
		const response: { price: number | null } = { price: null };
		const name = req.params.name;

		switch (req.params.country.toLowerCase()) {
			case "usa":
				response.price = usaFruits[name];
				break;
			case "au":
				response.price = auFruits[name];
				break;
			case "ind":
				response.price = indFruits[name];
				break;
			default:
				return next(new NotFoundError("country not available"));
		}

		if (!response.price) {
			return next(new NotFoundError("fruit not available"));
		}

		res.json(200, response);
		return next();
	}
}
