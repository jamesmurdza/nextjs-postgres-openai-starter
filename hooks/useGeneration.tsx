import { useState } from 'react';

// Define the interface for the hook
interface GenerationHook<T> {
  loading: boolean; // State indicating whether data is being loaded
  generateResource: (
    input: string,
    setResource: (resource: T) => void
  ) => Promise<void>; // Function for generating a resource
}

// Custom hook for generating a resource
function useGeneration<T>(endpoint: string): GenerationHook<T> {
  // State for tracking loading state
  const [loading, setLoading] = useState(false);

  // Function for generating a resource
  const generateResource = async (
    input: string,
    setResource: (resource: T) => void
  ): Promise<void> => {
    // Set loading state to true when starting generation
    setLoading(true);

    // Make a POST request to the specified endpoint
    const response = await fetch(`/api/generate/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input })
    });

    // Parse the response as JSON
    const data = await response.json();

    // Set the generated resource using the provided setter function
    setResource(data);

    // Set loading state to false when generation is complete
    setLoading(false);
  };

  // Return loading state and generateResource function
  return { loading, generateResource };
}

// Custom hook for generating images
export function useImageGeneration() {
  // Use the useGeneration hook with type { imageUrl: string }
  const { loading, generateResource } = useGeneration<{ imageUrl: string }>(
    'image'
  );
  return { loading, generateImage: generateResource };
}

// Custom hook for generating text
export function useTextGeneration() {
  // Use the useGeneration hook with type { generatedText: string }
  const { loading, generateResource } = useGeneration<{
    generatedText: string;
  }>('text');
  return { loading, generateText: generateResource };
}
