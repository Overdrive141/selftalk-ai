"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={[]}
      // redirectTo="http://localhost:3001/api/auth/callback"
      redirectTo={
        process.env.NODE_ENV === "development"
          ? "http://localhost:3001/auth/callback"
          : `${process.env.APP_URL}/auth/callback`
      }
    />
  );
}
