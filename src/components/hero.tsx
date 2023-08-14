"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useAnimationControls,
  useScroll,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import AudioWave from "./audiowave";
import DotsBackground from "./dots";
import ExpandingArrow from "./ui/expanding-arrow";
import Link from "next/link";

const HeroScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!targetRef.current) return;
      const { clientX, clientY } = ev;
      targetRef.current.style.setProperty("--x", `${clientX}px`);
      targetRef.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // contains number between 0 and 1 which represents the scroll progress
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
    // end end means when the bottom of the target element reaches the bottom of the viewport
    // end start means when the bottom of the target element reaches the top of the viewport
  });

  // first value is the range of the scrollYProgress, second value is the range of the opacity
  // If scrollY is 0, opacity is 1.  If scrollY is 1, opacity is 0.
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const position = useTransform(scrollYProgress, (position) => {
    return position === 1 ? "relative" : "fixed";
  });

  const DynamicSinewave = dynamic(() => import("@/components/ui/sinewave"), {
    ssr: false,
  });

  return (
    <>
      <DotsBackground />
      <motion.section
        style={{ opacity }}
        ref={targetRef}
        className="hero mt-[-50px] mb-[8rem] h-screen text-white"
      >
        <motion.div
          style={{ scale, x: "-50%", position }}
          className="left-1/2 z-10 flex flex-col items-center relative w-full"
        >
          {/* <p className="mb-8 text-center text-xs font-light text-text">
            by 141 Studios ,
            <br />
          </p> */}
          <h1 className="animate-fade mb-12 text-center font-semibold fade-in-95 font-heading text-3xl leading-[1]">
            SelfTalk <span className="text-zinc-500"> AI</span>
            {/* <br /> reimagined. */}
          </h1>
          <h2 className="text-muted-foreground animate-fade animate-delay-300">
            Seek guidance from within
          </h2>

          <AudioWave />
          <Link
            href="#contact"
            className="group rounded-full mt-40 top-20 absolute flex space-x-1 bg-black shadow-sm ring-1 ring-zinc-500 text-white text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
          >
            <p>Launching soon. Join the Waitlist</p>
            <ExpandingArrow />
          </Link>

          {/* <a
            className="border-2 bg-black rounded-full p-2 px-4 e"
            href="#contact"
          >
            <p>Launching soon. Join the Waitlist</p>
          </a> */}
          {/* <DynamicSinewave /> */}
        </motion.div>
      </motion.section>
    </>
  );
};

export default HeroScroll;
