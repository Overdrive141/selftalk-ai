"use client";

import Microphone from "@/assets/microphone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Mic2Icon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface OnboardingCardProps extends React.ComponentPropsWithoutRef<"div"> {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
  isEnabled: boolean;
  children?: ReactNode;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const OnboardingCard = ({
  title,
  description,
  icon,
  className,
  open,
  setOpen,
  isEnabled = false,
  children,
}: OnboardingCardProps) => {
  return (
    <Dialog open={open && open} onOpenChange={setOpen && setOpen}>
      <DialogTrigger asChild>
        <Card
          className={cn(
            `px-2 text-center py-0 items-center flex border-[0.5px] h-[200px] lg:w-[1/5] ${
              isEnabled
                ? "cursor-pointer pointer-events-auto hover:bg-accent shadow-2xl shadow-accent border-primary/75"
                : "cursor-default backdrop-blur-md blur-[1px] filter"
            }`,
            className
          )}
        >
          <CardHeader className="flex flex-col justify-center w-full h-full">
            <CardTitle className="text-base lg:text-[0.8rem] w-full flex flex-col items-center gap-4">
              {icon && icon} {title}
            </CardTitle>
            <div className="hidden lg:block">
              <CardDescription className="lg:text-sm text-[10px]">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export { OnboardingCard };
