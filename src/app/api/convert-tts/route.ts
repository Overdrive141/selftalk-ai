import { Database } from "@/lib/database.types";
import {
  createRouteHandlerClient,
  Session,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { addConversation } from "../conversations/route";

// Note: Replicate is useless to run tortoise model:
// 1. It hosts audio on its own server so privacy issues
// 2. It takes a lot of time to get a response from Replicate

// import Replicate from "replicate";

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN || "",
// });

export async function POST(request: Request) {
  // https://api.elevenlabs.io/v1/voices/add

  try {
    // submit audio to whisper (phase 1)
    // submit whisper response to openai/gpt/selected model (custom prompt)
    // submit response from model to elevel labs.
    // display Thinking... animation to user

    // Fetching voice id
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });
    const {
      data: { session },
      error: userError,
    } = await supabase.auth.getSession();

    const { data: voiceIdData, error: voiceIdError } = await supabase
      .from("profiles")
      .select("voice_id")
      .eq("id", session?.user.id!)
      .single();
    const voice_id = voiceIdData?.voice_id;
    // console.log("voiceId", voice_id);

    const bodyText = await request.json(); // { msg, conversationTypeId }
    console.log(bodyText);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVEN_LABS_API_KEY!,
          accept: "audio/mpeg",
        },
        body: JSON.stringify({
          //   text: "Testing",
          text: bodyText.msg,
          model_id: "eleven_monolingual_v1",
          voice_settings: { stability: 0.5, similarity_boost: 0.5 },
        }),
      }
    );

    // Dummy Voice
    // const response = await fetch(
    //   `https://github.com/SergLam/Audio-Sample-files/raw/master/sample.mp3`
    // );

    const audioResponseBuffer = await response.arrayBuffer();
    const audioBuffer = Buffer.from(audioResponseBuffer);

    const { data, error } = await uploadAudioToSupabase(
      supabase,
      session!,
      audioBuffer
    );

    // const fileName = `${session?.user.id}/${Date.now()}`;

    // const { data, error } = await supabase.storage
    //   .from("audio")
    //   .upload(fileName, audioBuffer, {
    //     contentType: "audio/mpeg",
    //   });

    // upload the file
    // successful upload => return the blob back to user & save it to conversations table
    // filePath returned to frontend,

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
        { role: "assistant", content: data.path, type: "audio" },
        supabase,
        session!,
        bodyText.conversationTypeId
      );

      await supabase.rpc("incrementconversationcount", {
        x: 1,
        row_id: session?.user.id!,
      });

      return new NextResponse(audioBuffer, {
        headers: {
          "Content-Type": "audio/mpeg", // Set the correct content type
        },
      });
    }
  } catch (err: any) {
    // console.log(err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export const uploadAudioToSupabase = async (
  supabase: SupabaseClient,
  session: Session,
  audioBuffer: Buffer
) => {
  const fileName = `${session?.user.id}/${Date.now()}`;

  return await supabase.storage.from("audio").upload(fileName, audioBuffer, {
    contentType: "audio/mpeg",
  });
};
