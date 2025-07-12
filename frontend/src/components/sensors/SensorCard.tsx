import { useEffect, useState } from "react";
import { getDevice } from "../../apis/api";
import { Cpu, CheckCircle, XCircle } from "lucide-react";
import LoadingSpinner from "../../utils/LoadingSpinner";

interface Sensor {
  sensor_id: string;
  total: number;
  lastActive: Date;
  status: "active" | "inactive";
}

const SensorCard = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDevice();
        setSensors(response.data.data);
      } catch (err) {
        console.error("Failed to fetch sensor summary:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl shadow p-6 w-full">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-white underline mb-6">
        Sensor Status
      </h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sensors.map((sensor) => (
            <div
              key={sensor.sensor_id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <Cpu
                  className="text-indigo-500 dark:text-indigo-400"
                  size={20}
                />
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  {sensor.sensor_id}
                </h3>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                👣 <span className="font-medium">{sensor.total}</span> total
                footfall
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                ⏱️ Last Seen:{" "}
                <span className="font-medium">
                  {new Date(sensor.lastActive).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </p>

              <div className="flex items-center gap-2 text-sm">
                {sensor.status === "active" ? (
                  <>
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-green-700 dark:text-green-400">
                      Active
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-red-500" />
                    <span className="text-red-700 dark:text-red-400">
                      Inactive
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SensorCard;
