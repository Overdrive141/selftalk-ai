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

    //TODO: Save the voiceId in user table as voiceId and save to session
    // On every request to tts api, this needs to be sent to ElevenLabs
    console.log(response);
    const data = await response.json();
    // const ip = request.headers["x-real-ip"] || request.connection.remoteAddress;

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    // console.log(err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
