"use client";

import Microphone from "@/assets/microphone";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mic2Icon } from "lucide-react";

const StartConversation = () => {
  return (
    <Card className="px-4 text-center py-0 items-center flex hover:bg-accent cursor-pointer border-[0.5px]">
      <CardHeader className="flex flex-col justify-between gap-4 h-full">
        <CardTitle className="text-xl flex flex-col items-center gap-4">
          <Mic2Icon width={40} height={40} /> 1. Register Your Voice
        </CardTitle>
        <CardDescription>Click to get started</CardDescription>
      </CardHeader>
    </Card>
  );
};

export { StartConversation };
