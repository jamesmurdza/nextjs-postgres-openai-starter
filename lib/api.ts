async function generateResource(endpoint: string, input: any) {
  const response = await fetch(`/api/generate/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input })
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch resource: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}

export async function generateImage(input: any) {
  return (await generateResource('image', input)).imageUrl;
}

export async function generateText(image: string) {
  return (await generateResource('text', image)).generatedText;
}
