import z from "zod";
import { SensorDataDTO } from "../dtos/sensor.dto";

const sensorDataSchema = z.object({
  sensor_id: z.string().min(1),
  timestamp: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  count: z.number().int().nonnegative(),
});

export function validateSensorData(data: unknown): SensorDataDTO {
  return sensorDataSchema.parse(data);
}
