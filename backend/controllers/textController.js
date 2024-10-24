// controllers/textController.js

let storedText = ''; // In-memory storage for recognized text

// Store recognized text
const storeText = (req, res) => {
  console.log('Received POST request with body:', req.body);

  const { text, message } = req.body;

  if (text) {
    storedText = text; // Store the recognized text
    console.log('Stored text:', storedText); // Log stored text
    res.status(200).json({ message: 'Text stored successfully' });
  } else {
    console.error('Error: No "text" field in request body'); // Log error
    res.status(400).json({ error: 'Text field is required' });
  }
};

// Retrieve stored text
const retrieveText = (req, res) => {
  console.log('Retrieving stored text:', storedText); // Log the retrieval
  res.status(200).json({ text: storedText });
};

module.exports = {
  storeText,
  retrieveText,
};
