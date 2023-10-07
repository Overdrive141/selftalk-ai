import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// export const runtime = "edge";

// stt: https://medium.com/@jordans2299/using-openai-whisper-api-with-next-js-13-8a19dcd0fdbf

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log(messages);

  // OpenAI sends us  streaming chat completion
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      ...messages,
      {
        role: "system",
        content: `You are my alter ego. Respond in first person as if I am talking directly to myself.
        Your job is to help me build confidence and answer any question I give you. 
        Do not give me random and suicial thoughts. Act as a life coach and personal adviser. Keep answers short and intelligent to a maximum of 3 sentences. Don't reply with absolutely or similar words. 
        You must directly give steps to action or advice.
        Example Question: I need to lose weight.
        Answer: Everyone struggles with weight and body dismorphia, this is normal. What will set you apart is that we will take a series of steps.
        `,
      },
    ],
  });

  console.log("Open AI Response", response);

  const voice_id = "aWDH3x2JnUyDBbeOilcn";

  //   const audioResponse = await fetch(
  //     `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "xi-api-key": "d53ff1e7334b4f256e4d57f2e61c54c8",
  //         accept: "audio/mpeg",
  //       },
  //       body: JSON.stringify({
  //         text: "Testing",
  //         model_id: "eleven_monolingual_v1",
  //         voice_settings: { stability: 0.5, similarity_boost: 0.5 },
  //       }),
  //     }
  //   );

  //   const audioResponseBuffer = await audioResponse.arrayBuffer();
  //   const audioBuffer = Buffer.from(audioResponseBuffer);

  //   return new NextResponse(audioBuffer, {
  //     headers: {
  //       "Content-Type": "audio/mpeg", // Set the correct content type
  //     },
  //   });

  const stream = OpenAIStream(response);

  //   console.log("Response", response);

  return new StreamingTextResponse(stream);

  //   return NextResponse.json(response.content);
}
