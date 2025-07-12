import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import sensorRoute from "./routes/sensor.routes";
import serverConfig from "./configs/server.config";
import databaseConfig from "./configs/db.config";

const app: Express = express();

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', sensorRoute);

serverConfig(app);
databaseConfig();
