import fetch from 'node-fetch';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function generateTextWithOpenAI(base64Document: string, prompt: string) {

  const payload = {
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: prompt,
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/png;base64,${base64Document}`,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  };

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log(data);
  return data.choices[0].message.content;
}