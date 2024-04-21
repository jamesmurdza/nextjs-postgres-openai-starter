import fetch from 'node-fetch';

const OPENAI_API_URL = 'https://api.openai.com/v1/';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface UserMessage {
  role: string;
  content: Array<{ type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } }>;
}

interface OpenAIImageResponse {
  data: { url: string }[];
}

interface OpenAIChatResponse {
  choices: { message: { content: string } }[];
}

async function fetchOpenAI<T>(endpoint: string, body: any): Promise<T> {
  const response = await fetch(`${OPENAI_API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorMessage = response.body
      ? `${response.status} - ${await response.text()}`
      : `HTTP error ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json() as T;
}

export async function generateImage(prompt: string): Promise<string> {
  const { data } = await fetchOpenAI<OpenAIImageResponse>('images/generations', {
    prompt,
    n: 1,
    size: '256x256',
  });
  return data[0].url;
}

export async function generateText({ prompt, image }: { prompt: string; image?: string }): Promise<string> {
  const messages: UserMessage[] = [
    {
      role: 'user',
      content: [{ type: 'text', text: prompt }],
    },
  ];

  if (image) {
    messages[0].content = [{ type: 'image_url', image_url: { url: image } }];
  }

  const payload = {
    model: 'gpt-4-turbo',
    messages,
    max_tokens: 300,
  };

  const { choices } = await fetchOpenAI<OpenAIChatResponse>('chat/completions', payload);
  return choices[0].message.content;
}