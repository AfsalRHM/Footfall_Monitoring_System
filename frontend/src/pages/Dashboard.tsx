import { useState } from "react";
import FootfallCharts from "../components/FootfallCharts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { BarChart2, List, MapPin } from "lucide-react";
import SensorSummary from "../components/SensorSummary";
import MapView from "../components/MapView";

const Dashboard = () => {
  const [active, setActive] = useState("chart");

  const navItems = [
    { id: "chart", label: "Foot Chart", icon: <BarChart2 size={18} /> },
    { id: "sensors", label: "Sensors", icon: <List size={18} /> },
    { id: "map", label: "Map View", icon: <MapPin size={18} /> },
  ];

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar setActive={setActive} navItems={navItems} active={active} />

        <div className="flex-1 p-6 overflow-auto bg-slate-700">
          {active == "chart" ? (
            <div style={{ height: 400 }}>
              <FootfallCharts />
            </div>
          ) : active == "sensors" ? (
            <SensorSummary />
          ) : (
            <MapView />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
