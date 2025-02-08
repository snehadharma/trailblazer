import axios from 'axios';

const DEEPSEEK_API_KEY = process.env.REACT_APP_DEEPSEEK_API_KEY;
const BASE_URL = 'https://api.deepseek.com/v1'; // Verify actual API endpoint

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const getDeepSeekResponse = async (prompt) => {
  try {
    const response = await api.post('/chat/completions', {
      model: 'deepseek-chat', // Verify correct model name
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};