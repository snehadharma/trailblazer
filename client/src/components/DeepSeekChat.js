import { useState } from 'react';
import { generateTexasRoadTrip } from '../api/deepseek';
import PropTypes from 'prop-types';


const DeepSeekChat = ({ onCitiesParsed }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const cities = await generateTexasRoadTrip(prompt);
      onCitiesParsed(cities);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="prompt-container">
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your ideal Texas road trip (e.g., '7-day trip focusing on historical sites and BBQ restaurants')"
          rows={3}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating Itinerary...' : 'Plan My Trip'}
        </button>
      </form>

      {error && <div className="error-message">⚠️ {error}</div>}
    </div>
  );
};

DeepSeekChat.propTypes = {
  onCitiesParsed: PropTypes.func.isRequired
};

export default DeepSeekChat;