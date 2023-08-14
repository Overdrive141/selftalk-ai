// DotBackground.tsx

import React from "react";

const DotBackground: React.FC = () => {
  const dots = [];

  // Number of rows and columns for dots
  const rows = 10;
  const cols = 10;

  // Space between dots in the grid
  const spacing = 150; // In pixels. Adjust this value to change the distance between dots

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Generate a random delay for each dot between 0 to 1.5s
      const delay = Math.random() * 1.5;
      dots.push(
        <circle
          key={`${i}-${j}`}
          cx={`${j * spacing}px`}
          cy={`${i * spacing}px`}
          r="1"
          className="fill-current text-white animate-pulse animate-infinite"
          style={{ animationDelay: `${delay}s` }}
        />
      );
    }
  }

  return (
    <svg id="dots" className="absolute top-0 left-0 w-full h-full">
      {dots}
    </svg>
  );
};

export default DotBackground;
