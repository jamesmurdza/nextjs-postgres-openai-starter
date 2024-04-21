import { useState } from 'react';

export default async function SettingsPage() {
  const [imageUrl, setImageUrl] = useState(null);

  const handleGenerateImage = async () => {
    const response = await fetch('/api/auth/[...nextauth]/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ width: 800, height: 600, bgColor: { r: 0, g: 0, b: 0, alpha: 1 } }),
    });
    const blob = await response.blob();
    const imageObjectUrl = URL.createObjectURL(blob);
    setImageUrl(imageObjectUrl);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
        <button onClick={handleGenerateImage} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Generate Image
        </button>
        {imageUrl && <img src={imageUrl} alt="Generated" />}
      </div>
    </main>
  );
}
