import * as Sentry from "@sentry/node";
import ENV from "./src/config/env.js";

Sentry.init({
    dsn:ENV.SENTRY_DSN,
    sendDefaultPii:true,
    tracesSampleRate:1.0,
    profilesSampleRate:1.0,
    environment:ENV.NODE_ENV || "development",
    includeLocalVariables:true,
})