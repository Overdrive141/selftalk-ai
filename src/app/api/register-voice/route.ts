import { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // https://api.elevenlabs.io/v1/voices/add

  try {
    // const bodyData = await request.json();
    const formData = await request.formData();
    console.log(formData);
    const response = await fetch("https://api.elevenlabs.io/v1/voices/add", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        "xi-api-key": process.env.ELEVEN_LABS_API_KEY!,
        // accept: "application/json",
      },
      body: formData,
    });

    // On every request to tts api, this needs to be sent to ElevenLabs
    console.log(response);
    const data = await response.json();
    // const ip = request.headers["x-real-ip"] || request.connection.remoteAddress;

    //TODO: Save the voiceId to session
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    const { data: profileData, error } = await supabase
      .from("profiles")
      .update({
        voice_id: data.voice_id,
      })
      .eq("id", session!.user.id);

    console.log(
      "User Profile Updated With Voice Id",
      JSON.stringify(profileData),
      data.voice_id
    );

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    // console.log(err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
