import { useEffect, useState } from "react";
import { getDeviceToday } from "../../apis/api";
import type { SensorSummary } from "../../types/sensor.type";
import LoadingSpinner from "../../utils/LoadingSpinner";

const SensorList = () => {
  const [sensors, setSensors] = useState<SensorSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDeviceToday();
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
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 w-full overflow-x-auto">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 underline">
        Sensor Summary (Today)
      </h2>

      {loading ? (
        <LoadingSpinner />
      ) : sensors.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">No sensors found.</p>
      ) : (
        <table className="min-w-full text-sm text-left text-slate-600 dark:text-slate-300">
          <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-2">Sensor ID</th>
              <th className="px-4 py-2">Today's Count</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor) => (
              <tr
                key={sensor.sensor_id}
                className="border-b border-slate-200 dark:border-slate-700"
              >
                <td className="px-4 py-2 font-medium">{sensor.sensor_id}</td>
                <td className="px-4 py-2">{sensor.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SensorList;
