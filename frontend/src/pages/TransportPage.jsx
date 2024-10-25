// pages/TransportPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Add useNavigate
import MapComponent from '../components/MapComponent';
import axios from 'axios';

export const TransportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate hook
  const [activeTab, setActiveTab] = useState('map');
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle back navigation
  const handleBack = () => {
    navigate(-1); // This will go back to the previous route in history
  };

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/itinerary/${id}`);
        if (response.data.status && response.data.data) {
          setItinerary(response.data.data);
        } else {
          throw new Error('Invalid data structure received');
        }
      } catch (err) {
        console.error('Error fetching itinerary:', err);
        setError(err.message || 'Failed to load itinerary details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItinerary();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Header with Back Button */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transport Planning</h1>
            <p className="text-gray-600 mt-2">Plan your journey and check weather conditions</p>
          </div>
        </div>
        
        {itinerary && (
          <div className="mt-2 text-sm text-gray-600">
            <p>From: {itinerary.currentLocation}</p>
            <p>To: {itinerary.destination}</p>
            <p>Travel Date: {new Date(itinerary.travelDate).toLocaleDateString()}</p>
            <p>Start Time: {itinerary.travelTime}</p>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <nav className="flex border-b">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-6 py-4 ${
              activeTab === 'map'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Route Map
          </button>
          <button
            onClick={() => setActiveTab('options')}
            className={`px-6 py-4 ${
              activeTab === 'options'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Transport Options
          </button>
          <button
            onClick={() => setActiveTab('weather')}
            className={`px-6 py-4 ${
              activeTab === 'weather'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Weather Details
          </button>
        </nav>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'map' && (
            <div>
              <MapComponent
                initialOrigin={itinerary ? {
                  lat: parseFloat(itinerary.currentLocationLat?.[0]),
                  lng: parseFloat(itinerary.currentLocationLong?.[0])
                } : null}
                initialDestination={itinerary ? {
                  lat: parseFloat(itinerary.destinationLat?.[0]),
                  lng: parseFloat(itinerary.destinationLong?.[0])
                } : null}
                initialStartDate={itinerary ? new Date(itinerary.travelDate) : new Date()}
                initialEndDate={itinerary ? new Date(itinerary.travelDate) : new Date()}
                readOnly={true} // Add this prop to prevent map clicks in view mode
              />
            </div>
          )}

          {activeTab === 'options' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Public Transport</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-blue-700">
                    <span className="mr-2">🚌</span> Bus Routes Available
                  </li>
                  <li className="flex items-center text-blue-700">
                    <span className="mr-2">🚇</span> Metro Connections
                  </li>
                  <li className="flex items-center text-blue-700">
                    <span className="mr-2">🚂</span> Train Services
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Private Transport</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-green-700">
                    <span className="mr-2">🚗</span> Car Rentals
                  </li>
                  <li className="flex items-center text-green-700">
                    <span className="mr-2">🚕</span> Taxi Services
                  </li>
                  <li className="flex items-center text-green-700">
                    <span className="mr-2">🚲</span> Bike Rentals
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'weather' && (
            <div className="bg-gray-50 p-6 rounded-lg">
              {/* Weather information will be handled by MapComponent */}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Route
        </button>
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Share Details
        </button>
        <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default TransportPage;