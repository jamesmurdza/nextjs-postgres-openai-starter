"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useGenerateText } from '@/hooks/useGenerateText';
import React from 'react';

import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  const [image, setImage] = useState(null);
  const [generatedText, setGeneratedText] = useState('');
  const { loading, generateText } = useGenerateText();

  const handleImageUpload = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.files && event.target.files.length) {
      setImage(event.target.files[0]);
    }
  };

  const handleGenerate = () => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        const base64Image = reader.result.split(',')[1];
        generateText(base64Image, (text) => {
          setGeneratedText(text);
        });
      };
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Analyze Image</h1>
      </div>
      <div>
        <div className="w-full flex items-center mb-5">
        <Input id="picture" type="file" onChange={handleImageUpload} />
        <Button
          type="button"
          className="ml-3 py-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
          onClick={handleGenerate}
        >
          Generate
        </Button>
        </div>
        <div>
        {image && (
      <img
      src={URL.createObjectURL(image)}
      alt="Uploaded image"
      className="max-w-64"
    />

      )}
        </div>
      </div>
      {loading ? (
        <div className="w-full mb-4 text-center relative">
          <div className="border border-input rounded-sm w-64 h-20 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Spinner />
            </div>
          </div>
        </div>
      ) : generatedText && <p className="mt-4">{generatedText}</p>}
    </main>
  );
}
