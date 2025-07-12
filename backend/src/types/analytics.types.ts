export type AnalyticsType = "hourly" | "daily" | "live";
export type DeviceType = "today" | "all";

export interface HourlyAnalytics {
  _id: {
    year: number;
    month: number;
    day: number;
    hour: number;
  };
  total: number;
}

export interface DailyAnalytics {
  _id: {
    year: number;
    month: number;
    day: number;
  };
  total: number;
}

export interface DevicesType {
  sensor_id: string;
  total: number;
  lastActive: Date;
  status: "active" | "inactive";
}

export interface SensorMeta {
  sensor_id: string;
}

export type TodaySensorData = {
  _id: string;
  total: number;
  lastActive: string | Date;
};
