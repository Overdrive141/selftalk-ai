import { ReactNode } from "react";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-backlight-gradient from-backlightCenter to-backlightEdge min-h-screen sm:pl-60">
      {children}
    </div>
  );
}
