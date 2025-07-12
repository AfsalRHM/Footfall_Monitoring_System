import { Request, Response } from "express";
import { validateSensorData } from "../validators/sensor.validators";
import sensorServices from "../services/sensor.services";
import { AnalyticsType, DeviceType } from "../types/analytics.types";

const postSensorData = async (req: Request, res: Response) => {
  try {
    const validated = validateSensorData(req.body);
    const result = await sensorServices.createSensorData(validated);

    res.status(200).json({ status: true, message: "Data Saved", data: result });
  } catch (err: any) {
    res.status(400).json({ status: false, message: err.message });
  }
};

const getAnalytics = async (req: Request, res: Response) => {
  try {
    const rawType = req.query.type || "hourly";

    if (typeof rawType !== "string") {
      return res.status(400).json({ message: "Invalid 'type' query param" });
    }

    const type = rawType as AnalyticsType;

    if (type !== "hourly" && type !== "daily" && type !== "live") {
      return res.status(400).json({ message: "Invalid analytics type" });
    }

    const result = await sensorServices.getAnalytics(type);

    res
      .status(200)
      .json({ status: true, message: "Analytics Fetched", data: result });
  } catch (err: any) {
    res.status(400).json({ status: false, message: err.message });
  }
};

const getDevices = async (req: Request, res: Response) => {
  try {
    const rawType = req.query.type || "all";

    if (typeof rawType !== "string") {
      return res.status(400).json({ message: "Invalid 'type' query param" });
    }

    const type = rawType as DeviceType;

    if (type !== "today" && type !== "all") {
      return res.status(400).json({ message: "Invalid analytics type" });
    }

    const result = await sensorServices.getDevices(type);

    res
      .status(200)
      .json({ status: true, message: "Devices data Fetched", data: result });
  } catch (err: any) {
    res.status(400).json({ status: false, message: err.message });
  }
};

export default {
  postSensorData,
  getAnalytics,
  getDevices,
};
