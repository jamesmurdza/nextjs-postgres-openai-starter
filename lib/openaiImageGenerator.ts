import fetch from 'node-fetch';

const OPENAI_API_URL = 'https://api.openai.com/v1/images/generations';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Make sure to set this in your .env file

export async function generateImageWithOpenAI(prompt) {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1, // Number of images to generate
      size: '256x256', // The size of the generated images
    }),
  });

  const data = await response.json();
  return data.data[0].url; // Assuming the API returns an array of generated images
}
