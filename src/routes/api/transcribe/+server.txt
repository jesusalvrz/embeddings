// src/routes/api/transcribe/+server.ts
import fs from 'fs';
import path from 'path';
import Groq from 'groq-sdk';
import type { RequestEvent } from '@sveltejs/kit';
import 'dotenv/config';
import { generateAudio } from '../cartesia/+server';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST({ request }: RequestEvent) {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const formData = await request.formData();
  const audioFile = formData.get('audio');

  if (!audioFile || !(audioFile instanceof File)) {
    return new Response(JSON.stringify({ error: "No se proporcionó un archivo de audio válido" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const filePath = path.join(uploadsDir, 'recording.ogg');
  const buffer = Buffer.from(await audioFile.arrayBuffer());

  await fs.promises.writeFile(filePath, buffer);

  const transcription = await groq.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: "whisper-large-v3-turbo",
    prompt: "Specify context or spelling",
    response_format: "json",
    language: "es",
    temperature: 0.0,
  });

  await generateAudio(transcription.text);

  return new Response(JSON.stringify({ text: transcription.text }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
