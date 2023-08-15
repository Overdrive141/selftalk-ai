"use client";

import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { Toaster } from "sonner";
import Waitlist from "./waitlist";

const Contact = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      id="contact"
      className="my-20 w-full px-5 items-center justify-center "
    >
      <Toaster
        theme="dark"
        position="bottom-center"
        expand={false}
        richColors
      />
      {inView && (
        <div className="h-full gap-2 px-10 animate-fade animate-once">
          <div className="flex flex-col self-start gap-4 h-[200px] md:h-[300px]">
            <h1 className="relative z-20 px-10 text-center md:text-left text-3xl md:text-4xl xl:text-3xl tracking-tight leading-[120%] font-gradient animate-fade animate-once">
              Reserve Your Voice in AI
            </h1>
            <p className="text-muted-foreground px-10 max-w-">
              Reserve your place & become a pioneer in a revolutionary approach
              to self-improvement.
            </p>
          </div>

          <Waitlist />
        </div>
      )}
    </div>
  );
  // Use Cases Cards 3 Step Process
};

export default Contact;

// Research Marketing Copy for Apple & Humane website
// to see what the best copy is for headlines for What we offer/features/use cases/
