// src/App.jsx
import { useState } from 'react';
import ItineraryForm from './components/ItineraryForm';
import MapComponent from './components/MapComponent';
import WeatherAlerts from './components/WeatherAlters';
import './App.css';

const App = () => {

  const [itinerary, setItinerary] = useState(null);


  return (
    <div className="App">
    <h1>Travel Planner with Weather Alerts</h1>
    <ItineraryForm onItineraryGenerated={setItinerary} />
    {itinerary && (
      <>
        <WeatherAlerts itinerary={itinerary} />
        <MapComponent itinerary={itinerary} apiKey='AIzaSyCcDeyOefP9CF_rLT4lwzTObf7l7y_L9pE' />
      </>
    )}
  </div>
  );
};

export default App;
