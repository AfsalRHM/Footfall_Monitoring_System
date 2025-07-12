import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

import sensors from "../constants/sensor.data";
import { env } from "../configs/env.config";


const simulateSensors = async () => {
  for (let sensor of sensors) {
    const payload = {
      sensor_id: sensor.sensor_id,
      timestamp: new Date().toISOString(),
      count: Math.floor(Math.random() * 20) + 1,
    };

    try {
      await axios.post(`${env.SIMULATE_BACKEND_URL}/sensor-data`, payload);
      console.log(`sent data for ${sensor.sensor_id}: ${payload.count}`);
    } catch (error: any) {
      console.error(`Failed for ${sensor.sensor_id}:`, error.message);
    }
  }
};

simulateSensors();

setInterval(simulateSensors, env.SIMULATE_INTERVAL as number);
