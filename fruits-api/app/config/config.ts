import { Config } from "../types";

const env = process.env.NODE_ENV || "development";

export let settings: Config = {
  name: "fruits-api",
  port: 3000,
  version: process.env.app_version || "1",
  env: "dev"
};

if (env === "production") {
  settings.env = "prod";
}
