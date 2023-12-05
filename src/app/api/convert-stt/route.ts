// Import necessary libraries
import OpenAI from "openai";
import { exec } from "child_process";
import fs, { createReadStream, write, writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { blob } from "stream/consumers";
import path from "path";
import FormDataNew from "form-data";
import { writeFile } from "fs/promises";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { uploadAudioToSupabase } from "../convert-tts/route";
import { addConversation } from "../conversations/route";

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

  let conversationTypeId = formData.get("conversationTypeId") as string;

  // // Create form data
  // const formData = new FormData();
  const file = formData.get("file") as File;

  console.log("Form Data", formData.get("conversationTypeId"), file);

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename =
    "file" + Date.now() + Math.round(Math.random() * 100000) + ".webm";

  console.log(__dirname, buffer);

  const filepath = `${path.resolve("tmp", filename)}`;
  // const filepath = `/tmp/${filename}`;

  try {
    if (!fs.existsSync("./tmp")) {
      fs.mkdirSync("./tmp");
    }
    fs.writeFileSync(filepath, buffer);
  } catch (err) {
    console.error("Error", err);
  }

  // await writeFile(filepath, buffer);
  console.log("filepath?", filepath);

  /**
   * We are going to check the file size here to decide
   * whether to send it or not to the API.
   * As for the min file size value, it is based on my testing.
   * There is probably a better way to check if the file has no audio data.
   */

  const minFileSize = 18000; // bytes
  const stats = fs.statSync(filepath);

  //   if(parseInt(stats.size) as number < minFileSize) {

  //     return new Response('Bad Request', {
  //         status: 400,
  //     })
  // }

  let data = "";

  const newFormData = new FormDataNew();
  newFormData.append("file", fs.createReadStream(filepath));

  console.log("Here?");

  //   formData.append('file', createReadStream(file.file), 'audio.wav');
  newFormData.append("model", "whisper-1");
  console.log(newFormData);
  // const response = await fetch(
  //   "https://api.openai.com/v1/audio/transcriptions",
  //   {
  //     method: "POST",
  //     headers: {
  //       // ...formData,
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //     },
  //     body: newFormData as any,
  //   }
  // );
  // const { text, error } = await response.json();
  // if (response.ok) {
  //   return NextResponse.json({ result: text }, { status: 200 });
  // } else {
  //   console.error(JSON.stringify(error));
  //   // console.error(error.response.status, error.response.data);
  //   return NextResponse.json({ error: error.response.data }, { status: 500 });
  // }

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filepath),
      model: "whisper-1",
    });

    // after successful transcription save the audio to supabase audio

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });

    const {
      data: { session },
      error: userError,
    } = await supabase.auth.getSession();

    const { data, error } = await uploadAudioToSupabase(
      supabase,
      session!,
      buffer
    );

    if (data) {
      console.log("Did you come here", data);

      // await fetch("/api/conversations", {
      //   method: "POST",
      //   cache: "no-cache",
      //   body: JSON.stringify({
      //     role: "assistant",
      //     content: data.path,
      //     type: "audio",
      //   }),
      // });

      await addConversation(
        { role: "user", content: data.path, type: "audio" },
        supabase,
        session!,
        parseInt(conversationTypeId)
      );

      console.log(transcription.text);
      return NextResponse.json({ result: transcription.text }, { status: 200 });
    } else {
      console.log("Failed to upload audio to supabase");
      return NextResponse.json(
        { error: "Failed to upload audio to supabase" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error(JSON.stringify(err));

    return NextResponse.json({ error: err }, { status: 500 });
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
