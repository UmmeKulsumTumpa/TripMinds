//api/amadeusApi.jsx
import axios from 'axios';

const API_URL = 'https://test.api.amadeus.com/v1/';
const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `${API_URL}security/oauth2/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: API_KEY,
        client_secret: API_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get access token:', error);
    throw error;
  }
};

export const searchHotels = async (cityCode) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`${API_URL}shopping/hotel-offers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        cityCode: cityCode,
        currency: 'BDT',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching hotel offers:', error);
    throw error;
  }
};
