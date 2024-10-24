// import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

// Map container styles
const containerStyle = {
  width: '100vw',
  height: '100vh',
};

// Center of the map (Saint Martin Island coordinates)
const center = {
  lat: 20.6308,
  lng: 91.9750,
};

const MapComponent = () => {
  // Load the Google Maps script with the API key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY, // Replace with your API key
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MapComponent;
