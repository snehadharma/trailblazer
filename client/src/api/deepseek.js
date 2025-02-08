import axios from 'axios';
import OpenAI from 'openai';

const DEEPSEEK_API_KEY = process.env.REACT_APP_DEEPSEEK_API_KEY;

const deepseek = axios.create({
  baseURL: 'https://api.deepseek.com/v1',
  headers: {
    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const generateTexasRoadTrip = async (userPrompt) => {
  try {
    const systemPrompt = `You are a Texas road trip planner. Respond ONLY with a comma-separated list of cities 
    forming a circular route within Texas. Format: StartCity, City2, City3, ..., StartCity. 
    Include 5-8 locations. Focus on major cities and attractions.`;

    const response = await deepseek.post('/chat/completions', {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], 
      max_tokens: 500,
    });

    return parseCities(response.data.choices[0].message.content);
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    throw new Error('Failed to generate road trip plan');
  }
};

// Helper function to parse the response
const parseCities = (responseText) => {
  const cities = responseText
    .split(',')
    .map(city => city.trim().replace(/\./g, ''))
    .filter(city => city.length > 0);

  // Validate response format
  if (cities.length < 2) throw new Error('Invalid number of cities');
  if (cities[0] !== cities[cities.length - 1]) {
    throw new Error('Route must start and end at the same city');
  }
  
  return cities;
};