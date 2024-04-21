import { useState } from 'react';

interface ImageGeneratorHook {
  loading: boolean;
  handleGenerateImage: (prompt: string, setImageUrl: (url: string) => void) => Promise<void>;
}

export function useImageGenerator(): ImageGeneratorHook {
  const [loading, setLoading] = useState(false);
  
  const handleGenerateImage = async (prompt: string, setImageUrl: (url: string) => void): Promise<void> => {
    setLoading(true); // Set loading to true when starting image generation
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setImageUrl(data.imageUrl);
    setLoading(false); // Set loading to false when image is loaded
  };
  
  return { loading, handleGenerateImage };
}