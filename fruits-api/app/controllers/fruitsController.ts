import * as restify from "restify";
import { NotFoundError } from "restify-errors";
import { logger } from "../services/logger";

export default class FruitsController {
  public getSeasonalFruitsByCountry(
    req: restify.Request,
    res: restify.Response,
    next: restify.Next
  ) {
    logger.info(`received request for ${req.params.country}`);
    let fruits: Record<string, number>;

    switch (req.params.country.toLowerCase()) {
      case "usa":
        fruits = { blueberry: 2.5, grape: 2.0, watermelon: 3.2, orange: 1.3 };
        break;
      case "au":
        fruits = { nectarine: 2.5, mandarin: 2.3, lemon: 1.1, kiwi: 2.6 };
        break;
      case "ind":
        fruits = { mango: 3.0, banana: 2.3, lychee: 1.4, apple: 2.0 };
        break;
      default:
        return next(new NotFoundError("country not available"));
    }

    res.json(200, fruits);
    return next();
  }
}
