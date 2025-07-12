import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const sensorData = [
  { name: "SENSOR_001", lat: 12.9716, lng: 77.5946 },
  { name: "SENSOR_002", lat: 12.9816, lng: 77.6046 },
  { name: "SENSOR_003", lat: 12.9716, lng: 77.5846 },
  { name: "SENSOR_004", lat: 12.9516, lng: 77.5746 },
];

const MapView = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current) {
      const map = L.map(mapRef.current).setView([12.9716, 77.5946], 13);
      leafletMapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(map);

      sensorData.forEach((sensor) => {
        L.marker([sensor.lat, sensor.lng])
          .addTo(map)
          .bindPopup(
            `<b>${sensor.name}</b><br/>Lat: ${sensor.lat}<br/>Lng: ${sensor.lng}`
          );
      });
    }
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 shadow rounded-2xl p-6 w-full max-w-full">
      <div className="flex justify-center mb-3">
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-white mb-4 underline">
          Sensor Locations
        </h1>
      </div>

      <div className="w-full h-96 rounded-xl overflow-hidden shadow">
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default MapView;
