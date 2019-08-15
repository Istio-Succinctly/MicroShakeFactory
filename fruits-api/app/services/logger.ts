import * as bunyan from "bunyan";

export let logger = bunyan.createLogger({
  name: "fruits-api",
  streams: [
    {
      stream: process.stdout,
      level: "debug"
    },
    {
      stream: process.stdout,
      level: "trace"
    }
  ]
});
