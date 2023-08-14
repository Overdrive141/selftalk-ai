"use client";

import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { Toaster } from "sonner";
import Waitlist from "./waitlist";

const Contact = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <div
      ref={ref}
      id="contact"
      className="md:h-[100vh] py-20 w-full px-5 items-center justify-center "
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
            <h1 className="text-4xl">Interested?</h1>
            <p className="text-muted-foreground">
              Join the waiting list to reserve your place in the line. Be one of
              the first ones to try.
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
