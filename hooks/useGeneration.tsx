import { useState } from 'react';

interface GenerateResourceHook<T> {
  loading: boolean;
  generateResource: (input: string, setResource: (resource: T) => void) => Promise<void>;
}

function useGeneration<T>(endpoint: string): GenerateResourceHook<T> {
  const [loading, setLoading] = useState(false);

  const generateResource = async (input: string, setResource: (resource: T) => void): Promise<void> => {
    setLoading(true);

    const response = await fetch(`/api/generate/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    setResource(data);
    setLoading(false);
  };

  return { loading, generateResource };
}

export function useImageGeneration() {
  const { loading, generateResource } = useGeneration<{ imageUrl: string }>('image');
  return { loading, generateImage: generateResource };
}

export function useTextGeneration() {
  const { loading, generateResource } = useGeneration<{ generatedText: string }>('text');
  return { loading, generateText: generateResource };
}