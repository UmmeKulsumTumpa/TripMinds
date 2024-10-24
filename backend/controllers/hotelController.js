const axios = require('axios');
require('dotenv').config();

const API_URL = 'https://test.api.amadeus.com/v2';
const API_KEY = process.env.AMADEUS_API_KEY;
const API_SECRET = process.env.AMADEUS_API_SECRET;

let accessToken = '';
let tokenExpiryTime = 0;

// Function to get a new access token
const getAccessToken = async () => {
  const currentTime = Math.floor(Date.now() / 1000);
  if (accessToken && currentTime < tokenExpiryTime) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: API_KEY,
        client_secret: API_SECRET,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiryTime = currentTime + response.data.expires_in;
    return accessToken;
  } catch (error) {
    console.error('Failed to get access token:', error);
    throw error;
  }
};

// Controller function to get hotel offers
exports.getHotelOffers = async (req, res) => {
  try {
    const { cityCode } = req.params;
    const token = await getAccessToken();

    // Adding required parameters for v2
    const response = await axios.get(`${API_URL}/shopping/hotel-offers`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
      },
      params: {
        cityCode,
        currency: 'BDT',
        // Add these required parameters
        roomQuantity: '1',
        adults: '2',
        checkInDate: '2024-02-01', // You should make this dynamic
        checkOutDate: '2024-02-02', // You should make this dynamic
        radius: '50',
        radiusUnit: 'KM',
        ratings: ['3', '4', '5'],
        bestRateOnly: true,
        paymentPolicy: 'NONE',
        includeClosed: false
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching hotel offers:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Failed to fetch hotel offers'
    });
  }
};

