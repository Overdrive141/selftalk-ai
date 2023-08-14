import * as React from "react";
const Speaker = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={10} cy={6} r={4} stroke="#fff" strokeWidth={1.5} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M19 2s2 1.2 2 4-2 4-2 4M17 4s1 .6 1 2-1 2-1 2M13 20.615c-.91.247-1.926.385-3 .385-3.866 0-7-1.79-7-4s3.134-4 7-4 7 1.79 7 4c0 .345-.077.68-.22 1"
    />
  </svg>
);
export default Speaker;
