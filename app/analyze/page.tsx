'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useTextGeneration } from '@/hooks/useGeneration';
import React from 'react';

import { Input } from '@/components/ui/input';

export default function AnalyzeImagePage() {
  // State variables for image and generated text
  const [image, setImage] = useState<File | null>(null);
  const [generatedText, setGeneratedText] = useState('');

  // Custom hook to handle text generation
  const { loading, generateText } = useTextGeneration();

  // Function to handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.files && event.target.files.length) {
      setImage(event.target.files[0]);
      setGeneratedText('');
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          generateText(reader.result, ({ generatedText }) => {
            setGeneratedText(generatedText);
          });
        }
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
          {/* Input field for image upload */}
          <Input id="picture" type="file" onChange={handleImageUpload} />
          {/* Button to trigger text generation */}
          <Button
            type="button"
            className="ml-3 py-2 bg-blue-500 text-white rounded-md"
            disabled={loading}
            onClick={handleSubmit}
          >
            Generate
          </Button>
        </div>
        <div className="flex gap-6">
          {/* Display uploaded image */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded image"
              className="max-w-64"
            />
          )}
          {/* Display loading spinner or generated text */}
          {loading ? (
            <div className="w-full mb-4 text-center relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner />
              </div>
            </div>
          ) : (
            generatedText && <p className="mt-4">{generatedText}</p>
          )}
        </div>
      </div>
    </main>
  );
}
