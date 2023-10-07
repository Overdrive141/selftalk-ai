// import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import LogoutButton from "./logout-button";

export default async function ProfileLogout() {
  //   const session = await getSession();
  //   if (!session?.user) {
  //     redirect("/login");
  //   }
  const cookieStore = cookies();

  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex w-full items-center justify-between">
      <Link
        // href="/profile"
        href="#"
        className="flex w-1/2 flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
      >
        <Image
          src={
            "https://pbs.twimg.com/profile_images/1681098319077036032/VnR2W_zT_400x400.jpg"
            // session.user.image ??
            // `https://avatar.vercel.sh/${session.user.email}`
          }
          width={40}
          height={40}
          // alt={session.user.name ?? "User avatar"}
          alt="User"
          className="h-6 w-6 rounded-full"
        />
        <span className="truncate text-sm font-medium">
          {/* {session.user.name} */}
          {session?.user.email}
          {/* Farhan H */}
        </span>
      </Link>
      <LogoutButton />
    </div>
  );
}
