import { NextResponse } from 'next/server';
import { generateText } from '@/lib/openai';

export async function POST(req: Request){
  const body = await req.json();
  const { image } = body;
  const generatedText: string = await generateText({
    image,
    prompt: "What's in this image?"
  });
  return NextResponse.json({ generatedText })
}