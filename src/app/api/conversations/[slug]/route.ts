import { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// TODO: Call this request from conversations page screen
export async function GET(request: Request) {
  try {
    const conversationTypeId = 1; // get this from Params later

    const supabase = createRouteHandlerClient<Database>({ cookies: cookies });

    const {
      data: { session },
      error: userError,
    } = await supabase.auth.getSession();

    console.log("Testing API");

    // get user from session if thats not working
    const { data: conversationData, error: conversationError } = await supabase
      .from("Conversations")
      .select()
      .eq("conversationTypeId", conversationTypeId)
      .eq("userId", session?.user.id!)
      .single();

    console.log("Message Response", conversationError);

    if (conversationData && conversationData.messages) {
      const messageResponse = await Promise.all(
        conversationData.messages?.map(async (message) => {
          const messageObj = JSON.parse(message);
          if (messageObj.type === "audio") {
            // console.log(messageObj.content);
            // replace the content inside the message object with the blob from storage bucket
            //   const { data, error } = await supabase.storage
            //     .from("audio")
            //     .download(messageObj.content);
            //     const audioBlob = Buffer.from(data, 'base64url')

            const { data, error } = await supabase.storage
              .from("audio")
              .createSignedUrl(messageObj.content, 3600); // valid for 1 hour
            // console.log("Message Response", data);
            messageObj.content = data?.signedUrl;
          }
          console.log("What is this?", JSON.stringify(messageObj));
          return messageObj;
        })
      );

      return NextResponse.json(
        { conversations: messageResponse, conversationsRaw: [] },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ data: [] }, { status: 200 });
    }
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// Change Blob in Messages to be actual blob, not url
// Make GET API work
// Make bot hcnversationType & userId multi column unique constraint using psotgres query
