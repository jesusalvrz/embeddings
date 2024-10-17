import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: env.OPENAI_API_KEY,
});

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { prompt } = await request.json();

    const { text } = await generateText({
      model: groq('llama3-8b-8192'),
      prompt: prompt,
    });

    return json({ result: text });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return json({ error: 'Ocurrió un error al procesar la solicitud' }, { status: 500 });
  }
};