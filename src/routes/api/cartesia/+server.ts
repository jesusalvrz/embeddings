// src/routes/api/cartesia/+server.ts
import Cartesia from "@cartesia/cartesia-js";
import fs from "node:fs";
import path from "path";

// Verificar que `CARTESIA_API_KEY` esté configurada.
if (!process.env.CARTESIA_API_KEY) {
  throw new Error("CARTESIA_API_KEY is not set");
}

// Configurar el cliente.
const client = new Cartesia({
  apiKey: process.env.CARTESIA_API_KEY,
});

// Ruta para guardar el archivo de audio generado.
const outputFilePath = path.join(process.cwd(), "src", "routes", "api", "cartesia", "sonic.wav");

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

    // Guardar `response` (de tipo ArrayBuffer) en un archivo.
    fs.writeFileSync(outputFilePath, new Uint8Array(response));
  } catch (error) {
    console.error("Error generating audio:", error);
  }
}
