// "use client";

// import { useEffect } from "react";
// import { initSinewave } from "../SineWave";
// // import InitSine from "../SineWave";

// export default function Sinewave(props: any) {
//   useEffect(() => {
//     // InitSineWave();
//     initSinewave();
//   }, []);

//   return (
//     <div className="js-modal js-h-screen | md:h-full fixed w-full inset-0 z-40">
//       <canvas className="waves js-sinewave | absolute inset-0 w-full h-full z-0"></canvas>
//     </div>
//   );
// }

// SineWave.tsx

"use client";

import React, { useRef, useEffect } from "react";

const SineWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let requestId: number;

  const animate = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    let start = new Date();
    const amplitude = 100;
    const frequency = 0.01;
    let x = 0;

    const draw = () => {
      const time = new Date() - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(
          i,
          canvas.height / 2 + amplitude * Math.sin((i + x) * frequency)
        );
      }
      x += 10; // speed
      ctx.strokeStyle = "#cecece";
      ctx.lineWidth = 2;
      ctx.stroke();
      requestId = requestAnimationFrame(draw);
    };
    draw();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        animate(ctx, canvas);
      }
    }
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="z-[-10] absolute top-50 mt-60 bottom-0 left-50 w-1/2 h-full"
    ></canvas>
  );
};

export default SineWave;
