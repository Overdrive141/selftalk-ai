import { Database } from "@/lib/database.types";
import {
  Session,
  SupabaseClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function addConversation(
  messages: Object,
  supabase: SupabaseClient,
  session: Session,
  conversationTypeId: Number
) {
  let dataId = null;

  const { data: conversationData, error } = await supabase
    .from("Conversations")
    .select("*")
    .eq("conversationTypeId", conversationTypeId)
    .eq("userId", session?.user.id!);

  console.log(conversationData);

  if (conversationData && conversationData.length > 0) {
    dataId = conversationData[0].id;
    const { data: appendData, error: appendError } = await supabase.rpc(
      "append_array",
      {
        id: dataId!,
        new_element: messages,
      }
    );

    console.log(appendData, appendError);
  } else {
    // every user will have one conversation of one type
    // this inserts a row if doesnt exist for that user.
    const { data, error } = await supabase
      .from("Conversations")
      .insert({
        conversationTypeId,
        userId: session?.user.id,
        messages: [messages],
      })
      .select();
  }
}

export async function POST(request: Request) {
  try {
    // TODO: Insert a conversationId
    // For now create one for personal assistant in db and add its ID here

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });

    const requestBody = await request.json();
    console.log("Request Body", requestBody);
    const conversationTypeId = 1; // get this from body or params later

    const {
      data: { session },
      error: userError,
    } = await supabase.auth.getSession();

    await addConversation(
      requestBody.messages,
      supabase,
      session!,
      conversationTypeId
    );

    console.log("userData", session);

    return NextResponse.json({ status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
