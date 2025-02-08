import axios from "axios";

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY

export const getRoadTripIdeas = async (userPrompt) => {
    console.log("user prompt: " + userPrompt);
    const prompt = `Generate a circular Texas road trip based on the following user request: ${userPrompt}.
    Provide ONLY a JSON array where each element contains { "city": "City Name", "description": "Brief description" }.
    The trip should start and end in the same city. Ensure the first and last cities in the JSON array are the same.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
        //   { role: "developer", content: "You are a helpful assistant." },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    // Log the full response for debugging
    console.log("OpenAI Response:", JSON.stringify(response.data, null, 2));

    // Check if the response contains valid choices
    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
      throw new Error("Invalid response from OpenAI API");
    }

    // Extract the response content
    const itineraryString = response.data.choices[0].message.content;
    
    const itinerary = JSON.parse(itineraryString); // Convert string to JSON
    
    console.log("parsed itinerary" + itinerary);

    return itinerary;
  
} catch (error) {
    console.error("Error fetching ChatGPT response:", error);
  }
};
