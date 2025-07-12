import { SensorDataDTO } from "../dtos/sensor.dto";
import { SensorModel } from "../models/sensor.model";
import {
  DailyAnalytics,
  DevicesType,
  HourlyAnalytics,
} from "../types/analytics.types";
import mergeSensors from "../utils/merge.sensors";

const saveSenserData = async (data: SensorDataDTO) => {
  try {
    const sensor = new SensorModel(data);
    return await sensor.save();
  } catch (error) {}
};

const getAalyticsLiveData = async (): Promise<HourlyAnalytics[]> => {
  try {
    const sixtyMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);

    const result = await SensorModel.aggregate([
      {
        $match: {
          timestamp: { $gte: sixtyMinutesAgo },
        },
      },
      {
        $addFields: {
          parts: {
            $dateToParts: {
              date: "$timestamp",
              timezone: "Asia/Kolkata",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            year: "$parts.year",
            month: "$parts.month",
            day: "$parts.day",
            hour: "$parts.hour",
            minute: "$parts.minute",
          },
          total: { $sum: "$count" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
          "_id.hour": 1,
          "_id.minute": 1,
        },
      },
    ]);

    return result ?? [];
  } catch (error) {
    console.error("Error fetching Live analytics:", error);
    return [];
  }
};

const getAnalyticsHourlyData = async (): Promise<HourlyAnalytics[]> => {
  try {
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

    const result = await SensorModel.aggregate([
      {
        $match: {
          timestamp: { $gte: twelveHoursAgo },
        },
      },
      {
        $addFields: {
          parts: {
            $dateToParts: {
              date: "$timestamp",
              timezone: "Asia/Kolkata",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            year: "$parts.year",
            month: "$parts.month",
            day: "$parts.day",
            hour: "$parts.hour",
          },
          total: { $sum: "$count" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
          "_id.hour": 1,
        },
      },
    ]);

    return result ?? [];
  } catch (error) {
    console.error("Error fetching hourly analytics:", error);
    return [];
  }
};

const getAnalyticsDailyData = async (): Promise<DailyAnalytics[]> => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const result = await SensorModel.aggregate([
      {
        $match: {
          timestamp: { $gte: sevenDaysAgo },
        },
      },
      {
        $addFields: {
          parts: {
            $dateToParts: {
              date: "$timestamp",
              timezone: "Asia/Kolkata",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            year: "$parts.year",
            month: "$parts.month",
            day: "$parts.day",
          },
          total: { $sum: "$count" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ]);

    return result ?? [];
  } catch (error) {
    console.error("Error fetching daily analytics:", error);
    return [];
  }
};

const getDevices = async (): Promise<DevicesType[]> => {
  try {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

    const result = await SensorModel.aggregate([
      {
        $group: {
          _id: "$sensor_id",
          total: { $sum: "$count" },
          lastActive: { $max: "$timestamp" },
        },
      },
      {
        $addFields: {
          status: {
            $cond: [
              { $gte: ["$lastActive", twoHoursAgo] },
              "active",
              "inactive",
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          sensor_id: "$_id",
          total: 1,
          lastActive: 1,
          status: 1,
        },
      },
      {
        $sort: { sensor_id: 1 },
      },
    ]);

    return result ?? [];
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};

const getTodayDevices = async (): Promise<DevicesType[]> => {
  try {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

    const sensors = await SensorModel.distinct("sensor_id");

    const todayData = await SensorModel.aggregate([
      {
        $match: {
          timestamp: { $gte: today },
        },
      },
      {
        $group: {
          _id: "$sensor_id",
          total: { $sum: "$count" },
          lastActive: { $max: "$timestamp" },
        },
      },
    ]);

    const result = mergeSensors({ todayData, sensors, twoHoursAgo });

    return result ?? [];
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};

export default {
  saveSenserData,
  getAalyticsLiveData,
  getAnalyticsHourlyData,
  getAnalyticsDailyData,
  getDevices,
  getTodayDevices,
};
