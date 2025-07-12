export interface SensorPayload {
  sensor_id: string;
  timestamp: Date;
  count: number;
}

export interface SensorSummary {
  sensor_id: string;
  total: number;
  status: "active" | "inactive";
}
