//routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const { getHotelOffers } = require('../controllers/hotelController');

// Define the route for fetching hotel offers
router.get('/hotels/:cityCode', getHotelOffers);

module.exports = router;
