"use client";

import { cn } from "@/lib/utils";
import { useSelectedLayoutSegments } from "next/navigation";
import { Separator } from "./ui/separator";

// on xl: height = 150px

const Footer = () => {
  const segments = useSelectedLayoutSegments();

  return (
    <section
      className={cn(
        `${
          segments.length > 0 && segments[0] !== "login"
            ? "bg-transparent sm:pl-60"
            : "bg-black"
        }`
      )}
    >
      {/*This is in case of main page */}
      {segments.length === 0 || segments[0] === "login" ? (
        <>
          <div
            className={`max-w-screen-xl px-4 mx-auto overflow-hidden sm:px-6 lg:px-8 py-12 space-y-8`}
          >
            <div className={cn(`flex items-center justify-between mt-8`)}>
              <div className="w-full h-full">
                <p className="cursor-default text-xl lg:text-4xl text-zinc-200 tracking-[-0.1rem] font-200 text-foreground">
                  141 Studios
                </p>
              </div>
              <div className="self-center text-center w-full">
                <p className="leading-6 font-inter text-xs md:text-sm tracking-widest text-muted-foreground">
                  {" "}
                  All Rights Reserved
                </p>
              </div>

              <div className="w-full">
                <p className="leading-6 text-xs md:text-sm lg:text-base text-right text-gray-400">
                  © 2023
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`max-w-screen-xl px-4 mx-auto overflow-hidden sm:px-6 lg:px-8 ${
              segments.length === 0 ? "py-12 space-y-8" : ""
            }`}
          >
            <div className="w-full h-full text-center space-y-2">
              <Separator />
              <p className="cursor-default text-lg lg:text-2xl  tracking-[-0.1rem] font-200 text-foreground">
                141 Studios
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Footer;

/**
 *
 */
