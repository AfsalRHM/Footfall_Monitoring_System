import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { getLiveData } from "../../apis/api";
import LoadingSpinner from "../../utils/LoadingSpinner";

// Create 60-minute data for current hour
// const data = Array.from({ length: 60 }, (_, i) => {
//   const hour = new Date().getHours();
//   const hour12 = hour % 12 === 0 ? 12 : hour % 12;
//   const ampm = hour < 12 ? "AM" : "PM";
//   const minute = i.toString().padStart(2, "0");
//   return {
//     label: `${hour12}:${minute} ${ampm}`,
//     count: Math.floor(Math.random() * 50),
//   };
// });

// Show only every 5th minute on X-axis
const CustomTick = ({ x, y, payload }: any) => {
  const index = parseInt(payload.value.split(":")[1]);
  if (index % 5 !== 0) return null;
  return (
    <text x={x} y={y + 10} textAnchor="middle" fill="#666" fontSize={10}>
      {payload.value}
    </text>
  );
};

const LiveChart = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLiveData();
        setData(response.data.data);
      } catch (err) {
        console.error("Failed to fetch Live Data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 shadow p-6 w-full max-w-full">
      <h1 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
        Live Footfall Analytics - Last 60 minutes
      </h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="label"
              height={30}
              tick={<CustomTick />}
              interval={0}
            />
            <YAxis
              label={{
                value: "Count",
                angle: -90,
                position: "insideLeft",
                fill: "#8884d8",
              }}
            />
            <Tooltip
              formatter={(value: any) => [`${value} visitors`, "Count"]}
              labelFormatter={(label: any) => `Time: ${label}`}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="total" fill="#8884d8" barSize={5} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default LiveChart;
