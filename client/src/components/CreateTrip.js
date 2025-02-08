import { useState } from 'react';
import DeepSeekChat
 from './DeepSeekChat';
function CreateTrip() {
  const [cities, setCities] = useState([]);

  const handleCitiesParsed = (parsedCities) => {
    setCities(parsedCities);
    // Pass cities to your Google Maps component here
    console.log('Parsed Cities:', parsedCities);
  };

  return (
    <div className="App">
      <h1>Texas Road Trip Planner</h1>
      <DeepSeekChat onCitiesParsed={handleCitiesParsed} />
      
      {cities.length > 0 && (
        <div className="itinerary-preview">
          <h3>Your Itinerary:</h3>
          <ul>
            {cities.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CreateTrip;