import * as React from "react";
const Microphone = (props) => (
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
      d="M20 12v1a8 8 0 1 1-16 0v-1m8 5a4 4 0 0 1-4-4V7a4 4 0 1 1 8 0v6a4 4 0 0 1-4 4Z"
    />
  </svg>
);
export default Microphone;
