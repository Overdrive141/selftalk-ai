"use client";

import { Mic } from "lucide-react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import Teleprompter from "@/components/teleprompter";
import { StopIcon } from "@radix-ui/react-icons";
import { DialogClose } from "@radix-ui/react-dialog";
import { useReactMediaRecorder } from "react-media-recorder";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import CardWithImage from "@/components/ui/card-with-image";

const INITIAL_TEXT = `I love meeting strangers and approach them with boldness and enthusiasm.
I live in the present and am confident of the future.
My personality exudes confidence. I am bold and outgoing.
I am self-reliant, creative, and persistent in whatever I do.
I am energetic and enthusiastic. Confidence is my second nature.
I always attract only the best of circumstances and the best positive people in my life.
I love change and easily adjust myself to new situations.
I am well-groomed, healthy, and full of confidence. My inner well-being matches my outer self.
Self-confidence is what I thrive on. Nothing is impossible, and life is great.
I always see only the good in others. I attract only positive, confident people.
Daily Positive Affirmations
I approve of myself and love myself deeply and completely.
I am unique. I feel good about being alive and being me.
I trust myself and know my inner wisdom is my best guide.
I have integrity. I am totally reliable. I do what I say.
I act from a place of personal security.
I fully accept myself and know that I am worthy of great things in life.
I choose to be proud of myself.
I find deep inner peace within myself as I am.
I fill my mind with positive and nourishing thoughts.
My confidence, self-esteem, and inner wisdom are increasing with each day.`;

interface TrainingModalProps extends React.ComponentPropsWithoutRef<"div"> {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ConversationTemplatesModal = ({ setOpen }: TrainingModalProps) => {
  /**
   * What are you looking to improve
   *
   * 1. Personal Assistant -
   * 2. Psychotherapy
   * 3. Fitness Coach
   * 4.
   * 5.
   * 6.
   * 7.
   * 8.
   * 9.
   * 10.
   *
   * TODO: Each Card will have a picture and a title below.
   *
   * For Ex: Personal Assistant Half image and Personal assistant below the card within the border
   */
  return (
    <>
      <DialogHeader>
        <DialogTitle>Choose Your Personalized Conversation</DialogTitle>
        <DialogDescription>Who do you want to talk to today?</DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-3 gap-4">
        <CardWithImage
          imageClassname="aspect-square h-[100px] cursor-pointer"
          title="Personal Assistant"
          description=""
          body=""
          icon="/confidence.avif"
          titleClassName="text-[14px] text-center font-semibold"
          image="/personal-assistant.jpg"
          cardClassName="bg-accent/40  hover:bg-accent"
          animate={false}
          variant="default"
          href="/app/dashboard"
        />
        <CardWithImage
          imageClassname="aspect-square h-[100px] filter blur-sm"
          title="Coming Soon"
          description=""
          body=""
          icon="/confidence.avif"
          titleClassName="text-sm text-center font-bold"
          image="/blurred-rainy.jpg"
          cardClassName="bg-accent/40"
          animate={false}
          variant="default"
          href="/app/dashboard"
        />

        <Card
          className={cn(
            `px-2 text-center py-0 items-center flex shadow-2xl shadow-accent border-primary/75"

            }`
          )}
        >
          <CardHeader className="flex flex-col justify-center w-full h-full">
            <CardTitle className="text-base lg:text-[0.8rem] w-full flex flex-col items-center gap-4">
              and more...
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export { ConversationTemplatesModal };
