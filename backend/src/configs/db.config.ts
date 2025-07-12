import mongoose from "mongoose";
import { env } from "./env.config";

const databaseConfig = () => {
  try {
    const MONGO_URI = env.MONGO_URI;
    mongoose.connect(MONGO_URI as string).then(() => {
      console.log("mongodb connected successfully");
    });
  } catch (error) {
    console.log("mongodb connection failed");
  }
};

export default databaseConfig;
