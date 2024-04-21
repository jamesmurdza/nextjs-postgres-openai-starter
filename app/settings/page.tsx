"use client";

import { useState } from 'react';

export default function SettingsPage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const handleGenerateImage = async () => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setImageUrl(data.imageUrl);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter an image prompt"
          className="px-4 py-2 border rounded-md"
        />
        <button onClick={handleGenerateImage} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Generate Image
        </button>
        {imageUrl && <img src={imageUrl} alt="Generated" />}
      </div>
    </main>
  );
}
