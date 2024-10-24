// src/api/weatherApi.js

export const getCoordinates = async (place) => {
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      place
    )}&key=AIzaSyCcDeyOefP9CF_rLT4lwzTObf7l7y_L9pE`;
  
    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();
  
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  };
  
  export const fetchWeatherData = async (latitude, longitude) => {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,weathercode`;
  
    try {
      const response = await fetch(weatherUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };
  