// frontend/src/components/TripPlanner.jsx

import { useState, useEffect } from 'react';
import TripMap from './TripMap';

const TripPlanner = () => {
  const [locations, setLocations] = useState([]);
  
  // Fetch locations from your API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/trip-locations');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trip Planner</h1>
      <TripMap
        locations={locations}
        apiKey={"AIzaSyCuAm0o9pcq3vl1rM3aHf3kvd-j5bc89vY"}
        onMarkerClick={(location) => console.log('Selected location:', location)}
        showRoute={true}
      />
    </div>
  );
};

export default TripPlanner;