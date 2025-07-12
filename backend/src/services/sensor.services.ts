import { SensorDataDTO } from "../dtos/sensor.dto";
import sensorRepository from "../repositories/sensor.repository";
import { AnalyticsType, DeviceType } from "../types/analytics.types";
import dateFilter from "../utils/date.filter";

const createSensorData = async (data: SensorDataDTO) => {
  try {
    const sensorData = await sensorRepository.saveSenserData(data);
    return sensorData;
  } catch (error) {
    throw new Error("Unable to create sensor data");
  }
};

const getAnalytics = async (type: AnalyticsType) => {
  try {
    let sensorData = [];
    if (type == "hourly") {
      let rawData = await sensorRepository.getAnalyticsHourlyData();
      sensorData = dateFilter.fillMissingHours(rawData, 12);
    } else if (type == "daily") {
      let rawData = await sensorRepository.getAnalyticsDailyData();
      sensorData = dateFilter.fillMissingDays(rawData, 7);
    } else {
      let rawData = await sensorRepository.getAalyticsLiveData();
      sensorData = dateFilter.fillMissingMinutes(rawData, 60);
    }

    return sensorData;
  } catch (error) {
    throw new Error("Unable to fetch analytics data");
  }
};

const getDevices = async (type: DeviceType) => {
  try {
    let sensorData = [];
    if (type == "today") {
      sensorData = await sensorRepository.getTodayDevices();
    } else {
      sensorData = await sensorRepository.getDevices();
    }

    return sensorData;
  } catch (error) {
    throw new Error("Unable to fetch devices data");
  }
};

export default {
  createSensorData,
  getAnalytics,
  getDevices,
};
