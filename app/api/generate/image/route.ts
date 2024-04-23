import { NextResponse } from 'next/server';
import { generateImage } from '@/lib/openai';

export async function POST(req: Request) {
  const body = await req.json();
  const { input } = body;
  const imageUrl: string = await generateImage(input);
  return NextResponse.json({ imageUrl });
}
