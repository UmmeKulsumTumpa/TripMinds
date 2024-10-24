// src/components/WeatherAlerts.jsx
import { useEffect, useState } from 'react';
import { getCoordinates, fetchWeatherData } from '../api/weatherApi';

const WeatherAlerts = ({ itinerary }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchWeatherAlerts = async () => {
      const newAlerts = [];

      for (const location of itinerary.locations) {
        const coords = await getCoordinates(location.name);
        if (coords) {
          const weatherData = await fetchWeatherData(coords.lat, coords.lng);
          const { weathercode } = weatherData.hourly;

          weathercode.forEach((code, hour) => {
            if (code === 3) newAlerts.push(`Rain expected at ${location.name}`);
            if (code === 45) newAlerts.push(`Storm warning at ${location.name}`);
          });
        }
      }

      setAlerts(newAlerts);
    };

    fetchWeatherAlerts();
  }, [itinerary]);

  return (
    <div className="weather-alerts">
      <h2>Weather Alerts</h2>
      {alerts.length > 0 ? (
        alerts.map((alert, index) => <p key={index}>{alert}</p>)
      ) : (
        <p>No weather alerts for your trip.</p>
      )}
    </div>
  );
};

export default WeatherAlerts;
