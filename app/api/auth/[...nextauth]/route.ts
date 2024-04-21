import { generateImageWithOpenAI } from '@/lib/openaiImageGenerator';

export { GET, POST } from '@/lib/auth';

export async function POST(req, res) {
  try {
    const imageUrl = await generateImageWithOpenAI(req.body.prompt);
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Image generation failed' });
  }
}
