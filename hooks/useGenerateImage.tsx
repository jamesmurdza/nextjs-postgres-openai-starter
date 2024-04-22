import { useState } from 'react';

interface ImageGeneratorHook {
  loading: boolean;
  handleGenerateImage: (prompt: string, setImageUrl: (url: string) => void) => Promise<void>;
}

export function useGenerateImage(): ImageGeneratorHook {
  const [loading, setLoading] = useState(false);
  
  const handleGenerateImage = async (prompt: string, setImageUrl: (url: string) => void): Promise<void> => {
    setLoading(true);
    const response = await fetch('/api/generate/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setImageUrl(data.imageUrl);
    setLoading(false);
  };
  
  return { loading, handleGenerateImage };
}