import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json(); // receive prompt here

  // Ask OpenAI for streaming completion with the prompt

  const response = await openai.completions.create({
    model: "text-davinci-003",
    stream: true,
    temperature: 0.6,
    max_tokens: 300,
    prompt: `You are a psychologist. 
        Your job is to help me build confidence and answer any question I give you. 
        Do not give me random and suicial thoughts.       
        Here is the question: ${prompt}
        `, // TODO: Experiment with advanced prompt engineering for every template on Open AI Playground
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
