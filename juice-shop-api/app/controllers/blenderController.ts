import "isomorphic-fetch";
import * as restify from "restify";
import { InternalServerError, InvalidArgumentError } from "restify-errors";
import { settings } from "../config/config";
import { logger } from "../services/logger";
import * as requestHelper from "../services/requestHelpers";

export default class BlenderController {
    public async blend(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        const country = req.headers.country || "";
        const data: { fruits: string[] } = req.body || {};
        let juice: string = "";
        let price: number = 0.0;
        const fruits_api: string = settings.fruits_api;
        logger.info(`fetching fruits ${data} from ${country}`);
        for (const fruit of data.fruits) {
            try {
                const apiResponse = await fetch(
                    `${fruits_api}/api/fruits/${country}/${fruit}/price`,
                    { headers: requestHelper.getTraceHeaders(req) }
                );
                if (apiResponse.ok) {
                    const response = await apiResponse.json();
                    price += response.price;
                    juice = juice + fruit + "-";
                } else {
                    if (apiResponse.status === 404) {
                        return next(
                            new InvalidArgumentError(
                                "please only select fruits available in your region"
                            )
                        );
                    }
                    return next(new InternalServerError("api call failed"));
                }
            } catch (err) {
                logger.error(err);
                return next(new Error(err));
            }
        }

        juice = juice.substring(0, juice.length - 1) + " juice";
        res.json(200, { juice, price });
        return next();
    }
}
