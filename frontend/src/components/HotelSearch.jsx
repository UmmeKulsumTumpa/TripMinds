import { useState } from 'react';

const HotelSearch = () => {
  const [cityCode, setCityCode] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setHotels([]); // Clear previous results
    try {
      const response = await fetch(`http://localhost:3001/api/hotels/${cityCode}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch hotel offers');
      }
      const data = await response.json();
      console.log('Hotel Data:', data); // Debugging
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Hotels in Bangladesh</h1>
      <input
        type="text"
        value={cityCode}
        onChange={(e) => setCityCode(e.target.value)}
        placeholder="Enter city code (e.g., DAC for Dhaka)"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.hotel.hotelId}>
            <h2>{hotel.hotel.name}</h2>
            <p>{hotel.hotel.address.lines.join(', ')}</p>
            <p>Price: {hotel.offers[0].price.total} BDT</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelSearch;
