"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { LogOut } from "lucide-react";
import { Database } from "@/lib/database.types";

const LogoutButton = () => {
  const supabase = createClientComponentClient<Database>();
  return (
    <form action="/api/logout" method="POST">
      <button
        type="submit"
        className="rounded-lg p-1.5 text-stone-700 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
      >
        <LogOut width={18} />
      </button>
    </form>
  );
};

export default LogoutButton;
