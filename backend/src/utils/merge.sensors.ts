import { DevicesType, TodaySensorData } from "../types/analytics.types";

const mergeSensors = ({
  todayData,
  sensors,
  twoHoursAgo,
}: {
  todayData: TodaySensorData[];
  sensors: string[];
  twoHoursAgo: Date;
}) => {
  const todayMap = new Map(todayData.map((item: any) => [item._id, item]));

  const result: DevicesType[] = sensors.map((sensor_id) => {
    const sensorData = todayMap.get(sensor_id);
    const lastActive = sensorData?.lastActive ?? null;

    return {
      sensor_id,
      total: sensorData?.total ?? 0,
      lastActive,
      status:
        lastActive && new Date(lastActive) >= twoHoursAgo
          ? "active"
          : "inactive",
    };
  });

  return result.sort((a, b) => a.sensor_id.localeCompare(b.sensor_id));
};

export default mergeSensors;
