import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
  SIMULATE_INTERVAL: process.env.SIMULATE_INTERVAL || 3600000,
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8000",
  SIMULATE_BACKEND_URL: process.env.SIMULATE_BACKEND_URL || "http://localhost:8000",
};
