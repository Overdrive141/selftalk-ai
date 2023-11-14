import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import { Database } from "../database.types";

export const useConversations = () => {
  const supabase = createClientComponentClient<Database>();

  const [convLimit, setConvLimit] = useState<number>(0);
  const [convNumber, setConvNumber] = useState<number>(0);

  const getUserConversationAnalytics = useCallback(async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    const { data, error } = await supabase
      .from("profiles")
      .select("convLimit, convNumber")
      .eq("id", session?.user.id!)
      .single();

    if (
      data &&
      data.hasOwnProperty("convLimit") &&
      data.hasOwnProperty("convNumber")
    ) {
      console.log("GetConv2", data);
      setConvLimit(data.convLimit!);
      setConvNumber(data.convNumber!);
    }
  }, [convLimit, convNumber]);

  useEffect(() => {
    getUserConversationAnalytics();
    console.log("GetConv");
  }, [getUserConversationAnalytics]);

  return { convLimit, convNumber, refetch: getUserConversationAnalytics };
};
