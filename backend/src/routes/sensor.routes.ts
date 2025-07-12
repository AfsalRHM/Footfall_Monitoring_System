import express from "express";
import senserControllers from "../controllers/sensor.controllers";

const sensorRoute = express.Router();

sensorRoute.post("/sensor-data", senserControllers.postSensorData);
sensorRoute.get("/analytics", senserControllers.getAnalytics);
sensorRoute.get("/devices", senserControllers.getDevices);

export default sensorRoute;
