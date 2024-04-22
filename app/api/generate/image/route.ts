import { NextResponse } from 'next/server';
import { generateImage } from '@/lib/openai';

export async function POST(req: Request){
  const body = await req.json();
  const { prompt } = body;
  const imageUrl: string = await generateImage(prompt);
  return NextResponse.json({ imageUrl })
}