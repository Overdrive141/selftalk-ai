// Import necessary libraries
import OpenAI from "openai";
import { exec } from "child_process";
import fs, { createReadStream } from "fs";
import { NextRequest, NextResponse } from "next/server";

// Promisify the exec function from child_process
const util = require("util");
const execAsync = util.promisify(exec);

// Configure the OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// This function handles POST requests to the /api/speechToText route
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  // if (!file) {
  //   res.status(400).send('No file uploaded');
  //   return;
  // }

  console.log(formData.get("file"));

  // // Create form data
  // const formData = new FormData();
  const file = formData.get("file") as File;
  //   formData.append('file', createReadStream(file.file), 'audio.wav');
  formData.append("model", "whisper-1");
  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        // ...formData,
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    }
  );

  const { text, error } = await response.json();
  if (response.ok) {
    return NextResponse.json({ result: text }, { status: 200 });
  } else {
    console.error(error.response.status, error.response.data);
    return NextResponse.json({ error: error.response.data }, { status: 500 });
  }
}

// This function converts audio data to text using the OpenAI API
async function convertAudioToText(audioData) {
  // Convert the audio data to MP3 format
  const mp3AudioData = await convertAudioToMp3(audioData);

  // Write the MP3 audio data to a file
  const outputPath = "/tmp/output.mp3";
  fs.writeFileSync(outputPath, mp3AudioData);

  // Transcribe the audio
  const response = await openai.createTranscription(
    fs.createReadStream(outputPath),
    "whisper-1"
  );

  // Delete the temporary file
  fs.unlinkSync(outputPath);

  // The API response contains the transcribed text
  const transcribedText = response.data.text;

  return transcribedText;
}

// This function converts audio data to MP3 format using ffmpeg
async function convertAudioToMp3(audioData) {
  // Write the audio data to a file
  const inputPath = "/tmp/input.webm";
  fs.writeFileSync(inputPath, audioData);

  // Convert the audio to MP3 using ffmpeg
  const outputPath = "/tmp/output.mp3";
  await execAsync(`ffmpeg -i ${inputPath} ${outputPath}`);

  // Read the converted audio data
  const mp3AudioData = fs.readFileSync(outputPath);

  // Delete the temporary files
  fs.unlinkSync(inputPath);
  fs.unlinkSync(outputPath);

  return mp3AudioData;
}
