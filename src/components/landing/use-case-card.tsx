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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";
import { JsxElement } from "typescript";

type CardProps = {
  icon: ReactNode | undefined;
  title: string;
  description: string;
  body: string;
  className: string | undefined;
};

export default function UseCaseCard({
  title,
  description,
  body,
  icon,
  className,
}: CardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="space-y-4 px-4 h-[200px]">
        <div className="align-center item-center">
          <CardTitle className="font-book flex gap-2 items-center font-styling font-display md:leading-none text-[16px] lg:text-md leading-[100%] text-slate-12">
            {title} {icon && icon}
          </CardTitle>
        </div>
        <CardDescription className="sans text-sm leading-[1.6] flex-wrap overflow-clip">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-[10px] text-muted-foreground tracking-wide">
        {body ? body : ""}
      </CardContent>
      {/* <CardFooter>
        <Button className="w-full">Create account</Button>
      </CardFooter> */}
    </Card>
  );
}
