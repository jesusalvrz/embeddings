// src/routes/api/cartesia/+server.ts
import Cartesia from "@cartesia/cartesia-js";
import { json } from "@sveltejs/kit"; // Importa json para retornar respuesta en formato JSON
import type { RequestEvent } from '@sveltejs/kit';

// Verificar que `CARTESIA_API_KEY` esté configurada.
if (!process.env.CARTESIA_API_KEY) {
  throw new Error("CARTESIA_API_KEY is not set");
}

// Configurar el cliente.
const client = new Cartesia({
  apiKey: process.env.CARTESIA_API_KEY,
});

// Crear una función asincrónica para hacer la llamada a la API y manejar la respuesta.
export async function generateAudio(transcript: string) {
  try {
    // Llamada a la API de Cartesia
    const response: ArrayBuffer = await client.tts.bytes({
      model_id: "sonic-multilingual",
      voice: {
        mode: "id",
        id: "15d0c2e2-8d29-44c3-be23-d585d5f154a1",
      },
      output_format: {
        container: "wav",
        encoding: "pcm_f32le",
        sample_rate: 44100,
      },
      transcript,
    });

    // Retornar el archivo de audio como un Blob
    return new Blob([new Uint8Array(response)], { type: 'audio/wav' });
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
}

export async function POST(event: RequestEvent) {
  const { transcript } = await event.request.json(); // Obtén el texto de la solicitud

  try {
    const audioBlob = await generateAudio(transcript);
    const audioUrl = URL.createObjectURL(audioBlob); // Crea una URL del Blob
    return json({ audioUrl }); // Devuelve la URL del audio
  } catch (error) {
    return json({ error: "Error generating audio" }, { status: 500 });
  }
}