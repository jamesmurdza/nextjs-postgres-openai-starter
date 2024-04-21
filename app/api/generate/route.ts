import { NextResponse } from 'next/server';
import { generateImageWithOpenAI } from '@/lib/openaiImageGenerator';

export async function POST(req: Request){
  const body = await req.json();
  const { prompt } = body;
  const imageUrl: string = await generateImageWithOpenAI(prompt);
  return NextResponse.json({ imageUrl })
}