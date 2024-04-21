"use client";

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import { useImageGenerator } from '@/hooks/useImageGenerator'

export default function SettingsPage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { loading, handleGenerateImage } = useImageGenerator(); // Using custom hook for loading logic

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleGenerateImage(prompt, setImageUrl); // Call the function to generate image
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full mb-4 flex items-center">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter an image prompt"
          className="px-4 py-2 border rounded-md flex-grow"
        />
        <Button type="submit" className="ml-3 py-2 bg-blue-500 text-white rounded-md">
          Generate Image
        </Button>
      </form>
      <div className="w-full mb-4 text-center">
        {loading && <Spinner />} {/* Show spinner only when loading */}
        {imageUrl && !loading && <img src={imageUrl} alt="Generated" />} {/* Show image when loaded and not loading */}
      </div>
    </main>
  );
}
