import { Config } from "../types";

const env = process.env.NODE_ENV || "development";

export let settings: Config = {
	name: "juice-shop-api",
	port: 3001,
	httpsPort: 4000,
	env: "dev",
	fruits_api: process.env.FRUITS_API || "http://localhost:3000",
	exoticFruits_api: process.env.EXOTIC_FRUITS_API || "",
	certificateKeyPath: __dirname + "/../certificates/key.pem",
	certificatePath: __dirname + "/../certificates/ssl.crt"
};

if (env === "production") {
	settings.env = "prod";
	settings.httpsPort = 443;
}
