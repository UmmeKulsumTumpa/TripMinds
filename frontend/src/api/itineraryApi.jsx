// src/api/itineraryApi.js

export const fetchItinerary = async (destination, budget) => {
    // Mock data for itinerary based on user inputs
    const mockItineraries = {
      'Saint Martin': [
        {
          name: 'Hotel Sea Pearl',
          type: 'accommodation',
          lat: 23.8125,
          lng: 91.2712,
          cost: budget === 'budget' ? 50 : budget === 'mid-range' ? 100 : 200,
        },
        {
          name: 'Ocean Breeze Restaurant',
          type: 'restaurant',
          lat: 23.8130,
          lng: 91.2745,
          cost: budget === 'budget' ? 10 : budget === 'mid-range' ? 25 : 50,
        },
        {
          name: 'Saint Martin Ferry Terminal',
          type: 'transport',
          lat: 23.8110,
          lng: 91.2722,
          cost: 20,
        },
      ],
    };
  
    try {
      // Simulate an API request with a timeout
      const itinerary = mockItineraries[destination] || [];
      return new Promise((resolve) =>
        setTimeout(() => resolve({ locations: itinerary, center: itinerary[0] }), 1000)
      );
    } catch (error) {
      console.error('Error fetching itinerary:', error);
      return { locations: [], center: null };
    }
  };
  