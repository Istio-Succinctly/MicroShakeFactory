import * as restify from "restify";
import { settings } from "../config/config";
import { logger } from "../services/logger";

export default class SpecialFruitController {
  public getSpecialFruit(
    req: restify.Request,
    res: restify.Response,
    next: restify.Next
  ) {
    logger.info(`received request for ${req.params.country}`);
    res.json(200, {
      ver: settings.version,
      fruit: settings.version === "1" ? "Mango" : "Orange"
    });
    return next();
  }
}
