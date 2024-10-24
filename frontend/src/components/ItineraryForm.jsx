// src/components/ItineraryForm.jsx
import { useState } from 'react';
import { fetchItinerary } from '../api/itineraryApi';

const ItineraryForm = ({ onItineraryGenerated }) => {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('mid-range');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itinerary = await fetchItinerary(destination, budget);
    onItineraryGenerated(itinerary);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Destination:
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </label>
      <label>
        Budget:
        <select value={budget} onChange={(e) => setBudget(e.target.value)}>
          <option value="budget">Budget</option>
          <option value="mid-range">Mid-range</option>
          <option value="luxury">Luxury</option>
        </select>
      </label>
      <button type="submit">Generate Itinerary</button>
    </form>
  );
};

export default ItineraryForm;
