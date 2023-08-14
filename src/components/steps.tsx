"use client";

import { StepCard } from "@/components/step-card";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import UseCaseCard from "./use-case-card";
import Microphone from "@/assets/microphone";
import Speaker from "@/assets/speaker";
import Question from "@/assets/question";

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

const steps = [
  {
    title: "1. Train Your Voice",
    label: "Speak the given words for 30 seconds",
    icon: <Microphone />,
  },
  {
    title: "2. Ask a Question",
    icon: <Question />,
    label:
      "Are you stuck in a situation? Simply ask: 'I am currently stuck in <situation>, what are my options?",
  },
  {
    title: "3. Get Your Answers",
    label: "Receive answers back in your own voice",
    icon: <Speaker />,
  },
];

const Steps = () => {
  // TODO: Shadcn Typeography throughout here with Inter font

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <div className="md:h-auto md:py-20 h-[150vh] w-full px-5 items-center justify-center bg-backlight-gradient from-backlightCenter to-backlightEdge">
      <div ref={ref}>
        {inView && (
          <>
            <h1 className="p-8 text-4xl animate-fade animate-once">
              Get started in 3 quick steps
            </h1>
            {/* <div className="flex"> */}
            <div className="items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={cn(
                    `col-span-2 grid items-start gap-6 lg:col-span-1 animate-fade-up animate-once animate-delay-[${
                      (idx + 1) * 500
                    }ms]`
                  )}
                >
                  <DemoContainer>
                    <UseCaseCard
                      className="bg-transparent"
                      title={step.title}
                      icon={step.icon}
                      body=""
                      description={step.label}
                    />
                  </DemoContainer>
                </div>
              ))}
            </div>
            {/* </div> */}
          </>
        )}
      </div>
    </div>
  );
  // Use Cases Cards 3 Step Process
};

export default Steps;
