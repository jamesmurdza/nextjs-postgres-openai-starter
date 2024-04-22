import fetch from 'node-fetch';

const OPENAI_API_URL = 'https://api.openai.com/v1/images/generations';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface OpenAIImageResponse {
  data: {
    url: string;
  }[];
}

interface TextMessage {
  type: 'text';
  text: string;
}

interface ImageMessage {
  type: 'image_url';
  image_url: {
    url: string;
  };
}

interface UserMessage {
  role: string;
  content: (TextMessage | ImageMessage)[];
}

interface OpenAIChatResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function generateImage(prompt: string) {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1,
      size: '256x256' // The size of the generated images
    }),
  });

  const data = await response.json() as OpenAIImageResponse;
  return data.data[0].url;
}

export async function generateText({ prompt, image }: { prompt: string; image?: string }): Promise<string> {
  const messages: UserMessage[] = [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: prompt,
        },
      ],
    },
  ];

  if (image) {
    messages[0].content.push({
      type: 'image_url',
      image_url: {
        url: `data:image/png;base64,${image}`,
      },
    });
  }

  const payload = {
    model: 'gpt-4-turbo',
    messages,
    max_tokens: 300,
  };

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json() as OpenAIChatResponse;
  return data.choices[0].message.content;
}