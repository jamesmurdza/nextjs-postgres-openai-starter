import { NextResponse } from 'next/server';
import { generateTextWithOpenAI } from '@/lib/openaiTextGenerator';

export async function POST(req: Request){
  const body = await req.json();
  const { image } = body;
  const generatedText: string = await generateTextWithOpenAI(image, "What's in this image?");
  return NextResponse.json({ generatedText })
}