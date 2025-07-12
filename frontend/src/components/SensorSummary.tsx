import { useState } from "react";
import SensorList from "./sensors/SensorList";
import SensorCard from "./sensors/SensorCard";

const SensorSummary = () => {
  const [view, setView] = useState<"list" | "card">("list");

  return (
    <div className="bg-white dark:bg-slate-900 shadow rounded-2xl p-6 w-full max-w-full">
      <div className="flex flex-col justify-between items-center mb-4 gap-5">
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-white underline">
          Sensor Summary
        </h1>
        <button
          onClick={() => setView(view === "list" ? "card" : "list")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-indigo-700 hover:cursor-pointer"
        >
          Switch to {view === "list" ? "Status" : "Count"} View
        </button>
      </div>

      {view === "list" ? <SensorList /> : <SensorCard />}
    </div>
  );
};

export default SensorSummary;
