// MapComponent.jsx
import  { useState, useEffect, useCallback } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

// Set the center point for Saint Martin
const center = {
  lat: 20.6280,
  lng: 92.3246,
};

// Define the container for the map
const containerStyle = {
  width: '100%',
  height: '600px',
};

const MapComponent = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);

  // Define some itinerary locations (Example: Saint Martin hotels, restaurants)
  const itineraryLocations = [
    { name: 'Saint Martin Hotel', lat: 20.6305, lng: 92.3241 },
    { name: 'Blue Marina Restaurant', lat: 20.6318, lng: 92.3237 },
    { name: 'Jetty Point', lat: 20.6295, lng: 92.3275 },
  ];

  const directionsCallback = useCallback((result, status) => {
    if (status === 'OK') {
      setDirectionsResponse(result);
    } else {
      console.error(`Directions request failed due to ${status}`);
    }
  }, []);

  useEffect(() => {
    // Trigger directions service if itinerary has more than one stop
    if (itineraryLocations.length > 1) {
      const origin = itineraryLocations[0];
      const destination = itineraryLocations[itineraryLocations.length - 1];

      const waypoints = itineraryLocations.slice(1, -1).map((location) => ({
        location: { lat: location.lat, lng: location.lng },
        stopover: true,
      }));

      const DirectionsServiceOptions = {
        origin: { lat: origin.lat, lng: origin.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        waypoints: waypoints,
        travelMode: 'DRIVING',
      };

      setDirectionsRequest(DirectionsServiceOptions);
    }
  }, [itineraryLocations]);

  const [directionsRequest, setDirectionsRequest] = useState(null);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCuAm0o9pcq3vl1rM3aHf3kvd-j5bc89vY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {/* Render markers for each location */}
        {itineraryLocations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            title={location.name}
          />
        ))}

        {/* Render directions if available */}
        {directionsRequest && (
          <DirectionsService
            options={directionsRequest}
            callback={directionsCallback}
          />
        )}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
