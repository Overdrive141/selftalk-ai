import * as React from "react";
const Question = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.967 12.75c1-1 2-1.395 2-2.5a2 2 0 0 0-3.937-.5m1.937 6h.01M21.004 12a9 9 0 0 1-9 9h-9s1.56-3.744.936-5a9 9 0 1 1 17.064-4Z"
    />
  </svg>
);
export default Question;
