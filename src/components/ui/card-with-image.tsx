"use client";

// import { Icons } from "@/components/icons"

import Image, { ImageProps } from "next/image";

type CardProps = {
  icon: string | undefined;
  title: string;
  description: string;
  body: string;
  className: string | undefined;
  image: ImageProps | undefined;
};

export default function CardWithImage({
  title,
  description,
  body,
  icon,
  className,
  image,
}: CardProps) {
  return (
    <div className="max-w-sm  border border-gray-200 rounded-lg shadow bg-gray-800 dark:border-gray-700 rounded-xl  animate-fade-up animate-once animate-delay-[500ms] flex w-full flex-col gap-3 md:gap-2">
      <a href="#" className="cursor-default overflow-hidden">
        <Image
          className="rounded-t-lg object-cover h-[200px]"
          src={image}
          alt=""
          width={500}
          height={200}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 whitespace-pre-wrap ">
          {description}
        </p>
      </div>
    </div>
  );
}
