import dotenv from "dotenv";
import { cleanEnv, host, num, port, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: "development",
    choices: ["development", "production", "test"],
  }),
  HOST: host({
    default: "localhost",
  }),
  PORT: port({
    default: 3000,
  }),
  CORS_ORIGIN: str({
    default: "*",
  }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({
    default: 1000,
  }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({
    default: 60000, // 1 minute
  }),
});
