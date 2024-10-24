// routes/textRoutes.js

const express = require('express');
const { storeText, retrieveText } = require('../controllers/textController');

const router = express.Router();

// Route to store text
router.post('/store-text', storeText);

// Route to retrieve stored text
router.get('/retrieve-text', retrieveText);

module.exports = router;
