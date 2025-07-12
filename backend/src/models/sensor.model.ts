import mongoose from "mongoose";

const SensorSchema = new mongoose.Schema({
  sensor_id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

export const SensorModel = mongoose.model("Sensor", SensorSchema);
