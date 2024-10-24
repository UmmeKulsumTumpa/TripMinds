import axios from 'axios';

const API_ENDPOINT = 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination';

const headers = {
  'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
  'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
};

export const fetchHotelDestinations = async (query) => {
  try {
    const response = await axios.get(API_ENDPOINT, {
      headers,
      params: {
        query: query,
        locale: 'en-gb',
        currency: 'BDT',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching hotel destinations:', error);
    throw error;
  }
};
