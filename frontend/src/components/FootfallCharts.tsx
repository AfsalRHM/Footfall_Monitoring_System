import DailyChart from "./charts/DailyChart";
import HourlyChart from "./charts/HourlyChart";
import LiveChart from "./charts/LiveChart";

const FootfallCharts: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 shadow rounded-2xl p-6 w-full max-w-full">
      <div className="flex justify-center mb-3">
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-white mb-4 underline">
          Footfall Analytics
        </h1>
      </div>

      <LiveChart />
      <HourlyChart />
      <DailyChart />
    </div>
  );
};

export default FootfallCharts;
