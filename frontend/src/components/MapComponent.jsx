import  { useState, useCallback, useMemo } from 'react';
import { GoogleMap, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';
import { itineraryLocations } from '../api/locationData'; // Ensure this import is correct

const containerStyle = {
  width: '100%',
  height: '600px',
};

const defaultCenter = { lat: 23.8122, lng: 91.2711 };

const MapComponent = ({ apiKey }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const mapOptions = useMemo(() => ({
    disableDefaultUI: true, // Optional: Hide default map controls
    zoomControl: true,
  }), []);

  const calculateRoute = useCallback(() => {
    if (itineraryLocations.length < 2) return;

    const waypoints = itineraryLocations.slice(1, -1).map((location) => ({
      location: { lat: location.lat, lng: location.lng },
      stopover: true,
    }));

    const origin = itineraryLocations[0];
    const destination = itineraryLocations[itineraryLocations.length - 1];

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`Error fetching directions ${status}`);
        }
      }
    );
  }, []);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={12}
      options={mapOptions}
    >
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </GoogleMap>
  );
};

export default MapComponent;
