import { useState } from 'react';

interface TextGeneratorHook {
  loading: boolean;
  generateText: (prompt: string, setText: (text: string) => void) => Promise<void>;
}

export function useTextGenerator(): TextGeneratorHook {
  const [loading, setLoading] = useState(false);

  const generateText = async (image: string, setText: (text: string) => void): Promise<void> => {
    setLoading(true);
    const response = await fetch('/api/generate-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image }),
    });
    const data = await response.json();
    setText(data.generatedText);
    setLoading(false);
  };

  return { loading, generateText };
}
