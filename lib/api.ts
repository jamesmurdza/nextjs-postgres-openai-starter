async function generateResource(endpoint: string, input: any) {
  // Fetch data from the specified API endpoint
  const response = await fetch(`/api/generate/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input })
  });

  // If the response is not successful, throw an error
  if (!response.ok) {
    throw new Error(
      `Failed to fetch resource: ${response.status} ${response.statusText}`
    );
  }

  // Parse and return the JSON response
  return await response.json();
}

// Function to generate an image based on input
export async function generateImage(input: any) {
  // Call generateResource function with 'image' endpoint
  // and return the imageUrl property from the response
  return (await generateResource('image', input)).imageUrl;
}

// Function to generate text based on an image
export async function generateText(image: string) {
  // Call generateResource function with 'text' endpoint
  // and return the generatedText property from the response
  return (await generateResource('text', image)).generatedText;
}
