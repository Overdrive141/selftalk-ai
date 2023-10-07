"use client";

import { cn } from "@/lib/utils";

import Image, { ImageProps } from "next/image";
import { useRouter } from "next/navigation";

type CardProps = {
  icon: string | undefined;
  title: string;
  description: string;
  body: string;
  imageClassname: string | undefined;
  image: string | undefined;
  titleClassName: string;
  cardClassName: string;
  animate: boolean;
  variant: string;
  href: string;
};

export default function CardWithImage({
  title,
  description,

  imageClassname,
  image,
  titleClassName = "text-2xl",
  cardClassName = "bg-accent/60 dark:border-gray-700 border-gray-200 ",
  animate = true,
  variant = "landing",
}: CardProps) {
  const variants = ["landing", "default"];
  // Check how shadcn defined his variants. for buttonVariants
  // for landing variant the default classes and padding for text applies
  // for other, it doesnt

  const navigate = useRouter();

  return (
    <div
      className={cn(
        "max-w-sm border shadow rounded-xl flex w-full flex-col gap-3 md:gap-2",
        cardClassName,
        animate ? "animate-fade-up animate-once animate-delay-[500ms]" : ""
      )}
      onClick={() => navigate.push("/app/conversations")}
    >
      {image && (
        <div className="cursor-default overflow-hidden">
          <Image
            className={cn(
              "rounded-t-lg object-cover object-top",
              imageClassname
            )}
            src={image}
            alt=""
            width={500}
            height={200}
          />
        </div>
      )}
      <div className={variant === "landing" ? "p-5" : "p-2"}>
        <a href="#">
          <h5
            className={cn(
              "mb-2 font-bold tracking-tight text-gray-900 dark:text-white",
              titleClassName
            )}
          >
            {title}
          </h5>
        </a>
        {description && (
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 whitespace-pre-wrap ">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
