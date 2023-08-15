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
    label: " teaching our AI your unique voice pattern.",
    icon: <Microphone />,
  },
  {
    title: "2. Initiate Conversations",
    icon: <Question />,
    label:
      "Start a dialogue with your AI-self. Ask questions, share concerns, or simply chat. E.g: 'I am currently stuck in <situation>, what are my options?'",
  },
  {
    title: "3. Deepen the Connection",
    label:
      "Over time, the more you converse, the better the AI will respond, enabling richer and more insightful dialogues",
    icon: <Speaker />,
  },
];

const Steps = () => {
  // TODO: Shadcn Typeography throughout here with Inter font

  const { ref, inView, entry } = useInView({
    /* Optional options */
    // threshold: 0.2,
    threshold: 0.5,
    triggerOnce: true,
    // rootMargin: "10px 0",
  });

  // ANimations are not working because the animate-fade-up makes it snap to that portion immediately
  // I need to either attach ref to each card inidivudally
  // or I can find an option so it doesnt snap it.

  return (
    <div
      ref={ref}
      className="w-full px-5 items-center justify-center bg-backlight-gradient from-backlightCenter to-backlightEdge"
    >
      <div className="pt-10 pb-5 md:py-20 flex flex-col md:block">
        {inView && (
          <>
            <h1 className="relative z-20 p-10 text-center md:text-left text-3xl md:text-4xl xl:text-3xl tracking-tight leading-[120%] font-gradient animate-fade animate-once">
              Begin Your Self-Talk Journey Today in 3 Simple Steps
            </h1>
            {/* <div className="flex"> */}
            <div className="flex flex-col max-w-sm self-center md:max-w-none items-start justify-center w-full md:justify-center gap-6 rounded-lg p-8 md:grid md:grid-cols-3 xl:grid-cols-3">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={cn(
                    `col-span-2 grid items-start gap-6 md:col-span-1 animate-fade-up animate-once animate-delay-[${
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
