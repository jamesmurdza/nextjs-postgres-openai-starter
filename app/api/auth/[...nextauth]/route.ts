import { generateImage } from '@/lib/imageGenerator';

export { GET, POST } from '@/lib/auth';

export async function POST(req, res) {
  try {
    const imageBuffer = await generateImage(req.body);
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Image generation failed' });
  }
}
