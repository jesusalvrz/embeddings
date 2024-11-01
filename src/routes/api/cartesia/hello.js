// hello.js
import Cartesia from "@cartesia/cartesia-js"
import fs from "node:fs"
import { spawn } from "node:child_process"

if (!process.env.CARTESIA_API_KEY) {
  throw new Error("CARTESIA_API_KEY is not set")
}

// Set up the client.
const client = new Cartesia({
  apiKey: process.env.CARTESIA_API_KEY,
})

// Make the API call.
const response = await client.tts.bytes({
  model_id: "sonic-multilingual",
  voice: {
    mode: "id",
    // Voz ingles
    //id: "7b642096-4840-4ec0-9015-71236a6829a6",
    // Voz español
    id: "15d0c2e2-8d29-44c3-be23-d585d5f154a1",
  },
  output_format: {
    container: "wav",
    encoding: "pcm_f32le",
    sample_rate: 44100,
  },
  transcript: "Hola, bienvenido a cartesia",
})

// Write `response` (of type ArrayBuffer) to a file.
fs.writeFileSync("sonic.wav", new Uint8Array(response))

// Play the file.
spawn("ffplay", ["-autoexit", "-nodisp", "sonic.wav"])
