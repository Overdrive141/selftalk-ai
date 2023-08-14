import Link from "next/link";
import { Suspense } from "react";
const { SITE_NAME } = process.env;

// Taken from Vercel COmmerce Repo

// TODO: Convert selftalk to inter font and make it lowercase the ai should be either a separate color or make it stand out

export default async function Navbar() {
  //   const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-start md:w-auto lg:mr-6 gap-1"
          >
            {/* <LogoSquare /> */}
            <div className="ml-2 flex-none text-sm font-medium lowercase font-inter tracking-widest md:hidden lg:block">
              Selftalk{"  "}
            </div>
            <div className="text-muted-foreground font-medium">{"  "}ai</div>
          </Link>
          {/* Might add About & Privacy Policy sections here later */}
          {/* {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null} */}
        </div>
      </div>
    </nav>
  );
}
