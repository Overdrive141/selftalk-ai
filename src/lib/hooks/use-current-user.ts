import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import { Database } from "../database.types";

interface ProfileDataProps {
  id: string;
  usernamed: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
  voice_id: string | null;
}

export const useCurrentUser = (userId: string | undefined) => {
  const supabase = createClientComponentClient<Database>();
  const [profileData, setProfileData] = useState<ProfileDataProps | null>(null);

  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select()
        .eq("id", userId!)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfileData(data);
      }
    } catch (error) {
      alert("Error loading user data!");
    }
  }, [userId, supabase]);

  useEffect(() => {
    if (userId) getProfile();
  }, [userId, getProfile]);

  return profileData;
};
