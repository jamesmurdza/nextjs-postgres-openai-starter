"use client";

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import { useImageGenerator } from '@/hooks/useImageGenerator';

export default function SettingsPage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { loading, handleGenerateImage } = useImageGenerator();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerateImage(prompt, (imageUrl) => {
      setImageUrls([...imageUrls, imageUrl]);
    });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex items-center">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter an image prompt"
          className="px-4 py-2 border rounded-md flex-grow"
        />
        <Button type="submit" className="ml-3 py-2 bg-blue-500 text-white rounded-md" disabled={loading}>
          Generate
        </Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="w-full mb-4 text-center relative">
            <img
              src={url}
              alt={`Generated ${index + 1}`}
              className="border rounded-sm border-input"
            />
          </div>
        ))}
        {loading && (
          <div className="w-full mb-4 text-center relative">
            <div className="border border-input rounded-sm w-64 h-64 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
