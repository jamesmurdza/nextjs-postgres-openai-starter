import { NextResponse } from 'next/server';
import { generateText } from '@/lib/openai';

export async function POST(req: Request) {
  const body = await req.json();
  const { input } = body;
  const generatedText: string = await generateText({
    image: input,
    prompt: "What's in this image?"
  });
  return NextResponse.json({ generatedText });
}
