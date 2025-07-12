import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getDailyData } from "../../apis/api";
import LoadingSpinner from "../../utils/LoadingSpinner";

const DailyChart = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDailyData();
        setData(response.data.data);
      } catch (err) {
        console.error("Failed to fetch Live Data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const interval = setInterval(fetchData, 3600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-slate-900 shadow p-6 w-full max-w-full">
        <h1 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
          Daily Footfall Analytics - Last 7 days
        </h1>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid />
              <Line dataKey="total" />
              <XAxis dataKey="label" />
              <YAxis
                label={{ value: "Count", position: "insideLeft", angle: -90 }}
              />
              <Legend />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
};

export default DailyChart;
