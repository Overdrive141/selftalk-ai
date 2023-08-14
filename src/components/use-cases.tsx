"use client";

import UseCaseCard from "@/components/use-case-card";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import CardWithImage from "./ui/card-with-image";

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
}

// It can be your personal assistant
// conversations are saved with context so you can keep coming back for more answers and advice

// Add "...and many more after the 3 cards"

// Use Case 1 Build your confidence Ask yourself the questions you have
// been wanting to ask Psychotherapy Get feedback from yourself Find your
// why Find what has been holding you back Be aware of who you are don't
// look at what others are doing. Get guidance from within judgement free
// 1. Psychotherapy 2. Build a relationship with yourself 3. Build your
// confidence and ask yourself questions you have always been wanting to
// ask but dont know the answers to.

const usecaseData = [
  {
    title: "Build your confidence",
    description:
      "Ask yourself the questions you have been wanting to ask but never knew the answers to",
    body: "",
    image: "/confidence.avif",
  },
  {
    title: "Psychotherapy",
    description: "Get feedback from yourself. Find your why.",
    body: "",
    image: "/psychotherapy.avif",
  },
  {
    title: "Your Personal Assistant",
    description:
      "It's everything you want & more. \nYour Personal Assistant. Your Personal Trainer. Your Career Coach",
    body: "",
    image: "/assistant.webp",
  },
];

const UseCases = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="mt-[100vh] lg:mt-[90vh] h-[250vh] lg:h-[100vh] w-full items-center justify-center bg-backlight-gradient from-backlightCenter to-backlightEdge"
    >
      <div className="w-full h-[150px] from-black to-backlightEdge"></div>
      <div className="px-10">
        {inView && (
          <>
            {/* <h1 className="p-8 text-2xl lg:text-4xl animate-fade animate-once animate-delay-500"> */}
            <h1 className="relative z-20 mb-12 max-w-lg text-[1.5rem] md:text-[3rem] tracking-tight leading-[120%] font-gradient">
              Where can we help?
            </h1>
            <div className="relative z-20 mt-12 grid w-full grid-cols-1 gap-12 sm:grid-cols-2 md:flex-row md:gap-20 lg:grid-cols-3 px-8">
              {/* <div className="flex flex-col md:flex-row items-start justify-center gap-6 rounded-lg p-8"> */}
              {/* <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4"> */}
              {usecaseData.map((usecase, idx) => (
                <CardWithImage
                  key={idx}
                  className="bg-transparent"
                  title={usecase.title}
                  description={usecase.description}
                  body={usecase.body}
                  image={usecase.image || undefined}
                />
              ))}
            </div>
            {/* </div> */}
            <h1 className="p-8 text-xl animate-fade animate-once animate-delay-[1700ms]">
              and many more...
            </h1>
          </>
        )}
      </div>
    </div>
  );
  // Use Cases Cards 3 Step Process
};

export default UseCases;
