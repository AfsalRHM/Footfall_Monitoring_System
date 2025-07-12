import type { SensorPayload } from "../types/sensor.type";
import axiosInstance from "./axios.instance";

export const saveSensorData = (payload: SensorPayload) => {
  return axiosInstance.post("/sensor-data", payload);
};

export const getDailyData = () => {
  return axiosInstance.get("/analytics?type=daily");
};

export const getHourlyData = () => {
  return axiosInstance.get("/analytics?type=hourly");
};

export const getLiveData = () => {
  return axiosInstance.get("/analytics?type=live");
};

export const getDeviceToday = () => {
  return axiosInstance.get("/devices?type=today");
};

export const getDevice = () => {
  return axiosInstance.get("/devices?type=all");
};
