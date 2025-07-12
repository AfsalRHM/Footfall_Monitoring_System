import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getHourlyData } from "../../apis/api";
import LoadingSpinner from "../../utils/LoadingSpinner";

const HourlyChart = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const lastHourRef = useRef(new Date().getHours());
  const lastRefreshRef = useRef(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHourlyData();
        setData(response.data.data);
        lastHourRef.current = new Date().getHours();
        lastRefreshRef.current = Date.now();
      } catch (err) {
        console.error("Failed to fetch Hourly Data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      const currentHour = new Date().getHours();
      const now = Date.now();

      const fifteenMinutesPassed =
        now - lastRefreshRef.current >= 15 * 60 * 1000;

      if (currentHour !== lastHourRef.current || fifteenMinutesPassed) {
        fetchData();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-slate-900 shadow p-6 w-full max-w-full">
        <h1 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
          Hourly Footfall Analytics - Last 12 hours
        </h1>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="label" stroke="#8884d8" />
              <YAxis
                label={{ value: "Count", position: "insideLeft", angle: -90 }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#4F46E5"
                strokeWidth={2}
                activeDot={{ r: 9 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
};

export default HourlyChart;
