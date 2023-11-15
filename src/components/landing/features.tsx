// Get Feedback within Seconds: We use the latest AI LLM models to cut down on latency to give you a more personalized and real life like experience. It's almost like talking in real time to yourself

// Bi Directional Speech: Simply speak & get your answers. No need to type. <caption text muted> more languages coming soon. Currently only English is supported </caption>

// Supports Bi Directional Speech. (More Languages In Future)

// Revisit your past conversations to keep asking more  We provide you with examples & templates of questions you may want to ask according to different categories, everything from psychotherapy to career & situational advices
// Based on feedback, more templates will be added.

// Privacy First: All your audio recordings are encrypted and we do not have any access to them.

// TODO:

// 5 Feature Cards: Title and body. Choose from above

// 3 Use Case Cards: Title & Body

// Interested? Stay Informed & get on the waiting list => TextInput and submit button has colored line animating around it (Twitter Bookmark has example)

// The first 3 tries are free for the first 100 people on the waiting list.
// When user clicks submit on it it goes into loading state, saves their email into my db and then the text input and div is replaced by "You're all set. We'll inform you when it's your turn. You are number x on the waiting list. Want to jump up higher? Share the link and get more people onboarded. {copybtn} (Look for market research on how invite only websites like OnePlus and other SaaS businesses operate)
// We'

"use client";

// import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import UseCaseCard from "./use-case-card";

/*
const usecaseData = [
  {
    title: "Get Feedback within Seconds",
    description:
      "We use the latest AI LLM models to cut down on latency to give you a more personalized and real life like experience. It's almost like talking in real time to yourself",
    body: "Note: More languages coming soon. Currently only English is supported ",
  },
  // {
  //   title: "Bi Directional Speech",
  //   description: "Simply speak & get your answers. No need to type",
  //   body: "More languages coming soon. Currently only English is supported </caption>",
  // },
  {
    title: "Revisit Past Conversations",
    description:
      "Revisit your past conversations to keep asking more.  We provide you with examples & templates of questions you may want to ask according to different categories, everything from psychotherapy to career & situational advices",
    body: "",
  },
  {
    title: "Privacy First",
    description:
      "All your audio recordings are encrypted and we do not have any access to them.",
    body: "",
  },
  {
    title: "Research Driven",
    description:
      "We have partnered up with the leading psychologists & experts to eleviate the user experience to ensure you get the most out of our product",
  },
];
*/

const features = [
  {
    key: 1,
    title: "Instant Feedback",
    description:
      "Powered by state-of-the-art AI LLM models, SelfTalk AI ensures minimal latency for an almost real-time conversation experience.",
    body: "Note: We're constantly expanding our linguistic capabilities. For now, we only support English.",
  },
  {
    key: 2,
    title: "Reflect & Re-engage",
    description:
      "Your past dialogues aren't just memories. Revisit them to dive deeper or gain clarity on prior thoughts.",
    body: "",
  },
  {
    key: 3,
    title: "Unwavering Privacy Commitment",
    description:
      "Your trust is paramount. All audio recordings are encrypted, ensuring your conversations remain private.",
    body: "",
  },
  {
    key: 4,
    title: "Rooted in Research",
    description:
      "Benefit from insights and methodologies grounded in rigorous research and user-centric design.",
    body: "",
  },
];

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

const Features = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    // threshold: 0.2,
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div className="w-full px-5 items-center justify-center bg-backlight-gradient from-backlightCenter to-backlightEdge">
      <div className="py-12 md:py-20">
        {/* {inView && ( */}
        <>
          {/* <h1 className="p-8 text-4xl animate-fade animate-once">
            What can you get?
          </h1> */}
          <h1 className="relative z-20 p-10 text-center md:text-left text-3xl md:text-4xl xl:text-3xl tracking-tight leading-[120%] font-gradient animate-fade animate-once">
            Empowerment Tools for Self-Reflection
          </h1>
          <div
            ref={ref}
            className="p-10 relative z-20 mt-12 grid w-full grid-cols-1 gap-12 sm:grid-cols-2 md:flex-row md:gap-20 lg:grid-cols-4"
          >
            {inView &&
              features.map((feature, idx) => (
                <UseCaseCard
                  key={feature.key}
                  className={`rounded-xl border bg-accent/20 shadow-2xl animate-fade-up animate-once flex w-full flex-col gap-3 md:gap-2 animate-delay-[${
                    feature.key * 500
                  }ms]`}
                  title={feature.title}
                  description={feature.description}
                  body={feature.body}
                  icon={undefined}
                />
              ))}
            {/* </div> */}
          </div>
        </>
      </div>
    </div>
  );
  // Use Cases Cards 3 Step Process
};

export default Features;

// Research Marketing Copy for Apple & Humane website
// to see what the best copy is for headlines for What we offer/features/use cases/
