# 👣 Footfall Monitoring System

A full-stack real-time sensor analytics dashboard to monitor footfall counts across multiple devices. Built with **Node.js**, **TypeScript**, **React**, **MongoDB**, and **Docker**, it includes:

- 📊 Real-time footfall charting  
- 📋 Sensor summaries with status and activity  
- 🗺️ Location mapping using Leaflet  
- ⚙️ Data simulation from multiple sensors  
- 🌐 Dockerized microservices  

---

## 🚀 Features

- 📈 **Analytics Dashboard** – Hourly/Daily footfall trends  
- 🔄 **Real-Time Updates** – Charts auto-refresh periodically  
- 💡 **Sensor Summary** – View total count, status (active/inactive), last seen  
- 🌍 **Map View** – Display sensor locations on an interactive map  
- 🤖 **Simulator** – Generates realistic sensor traffic at intervals  
- ☁️ **Dockerized** – Easy to run full-stack app using `docker-compose`  

---

## 🧱 Project Structure

```
Footfall Monitoring/
├── backend/ # Express + TypeScript API server
├── frontend/ # React + Vite + Tailwind frontend
├── docker-compose.yml # Docker orchestration
└── README.md
```

---

## 🛠️ Tech Stack

| Layer      | Technology                            |
|------------|---------------------------------------|
| Frontend   | React, TypeScript, TailwindCSS        |
| Backend    | Node.js, Express, TypeScript          |
| Database   | MongoDB                               |
| Simulator  | Axios + Random Data Generator         |
| Realtime   | Polling + SetIntervals (configurable) |
| Map        | Leaflet + OpenStreetMap               |
| Container  | Docker + Docker Compose               |

---

## 🐳 Run with Docker

### 1. Clone the repo

```bash
git clone https://github.com/AfsalRHM/footfall-monitoring-system.git
cd footfall-monitoring-system
```

### 2. Build and start all services
```
docker-compose up --build
```

### 3. Access the app
```
Frontend: http://localhost:3000
Backend API: http://localhost:8000
```

## ⚙️ Environment Variables
Create .env files in respective folders:

- backend/.env
```
PORT=8000
MONGO_URI=mongodb://localhost:27017/footfall
BACKEND_URL = http://localhost:8000
SIMULATE_INTERVAL = 3600000
SIMULATE_BACKEND_URL = http://backend:8000
```

- frontend/.env
```
VITE_API_BASE_URL = http://localhost:8000
```

## 📊 API Endpoints

| Method | Endpoint             | Description                   |
|--------|----------------------|-------------------------------|
| POST   | `/sensor-data`       | Submit simulated sensor data  |
| GET    | `/analytics/hourly`  | Get hourly footfall counts    |
| GET    | `/analytics/daily`   | Get daily footfall counts     |
| GET    | `/devices`           | Get sensor status and summary |


---

## 🛡️ Security Notes

- Always secure your `.env` and use `.gitignore` to prevent credential leaks.

---

## ❓ Facing Issues?

If you face any problems during setup or usage, raise an issue in the [GitHub Issues](https://github.com/AfsalRHM/Footfall_Monitoring_System/issues) tab.

---

## 🤝 Author

- **Afsal Rahman M**
- [LinkedIn](https://www.linkedin.com/in/afsalrahmanm/)
- [GitHub](https://github.com/AfsalRHM)


**Happy Coding! 🚀**
