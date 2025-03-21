"use client";

import * as React from "react";
//import { DropdownMenuTriggerProps } from "@/components/ui/react-dropdown-menu";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
//import { NpmCommands } from "types/unist";
import { Toaster, toast } from "sonner";

import { Event } from "@/lib/events";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  src?: string;
  event?: Event["name"];
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value);
  if (event) {
    // trackEvent(event);
  }
}

export function CopyButton({
  value,
  className,
  src,
  event,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 10000);
  }, [hasCopied]);

  return (
    <Button
      //   size="lg"
      //   variant="outline"
      //   size="icon"
      //   variant="ghost"
      className={cn(
        // "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
        className
      )}
      onClick={() => {
        copyToClipboardWithMeta(
          value,
          event
            ? {
                name: event,
                properties: {
                  code: value,
                },
              }
            : undefined
        );
        toast.success("Copied");
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <div className="transition-all animate-fade animate-delay-300 animate-duration-[2000ms] w-full flex gap-2 items-center">
          <span>Copied</span>
          <CheckIcon className="h-5 w-5 accent-green-900 border-green-900" />
        </div>
      ) : (
        <div className="animate-fade transition-all animate-once animate-duration-[1000ms] w-full flex gap-2 items-center">
          <CopyIcon className="h-3 w-3" />
          <span>Copy Link</span>
        </div>
      )}
    </Button>
  );
}

// interface CopyWithClassNamesProps extends DropdownMenuTriggerProps {
//   value: string;
//   classNames: string;
//   className?: string;
// }

// export function CopyWithClassNames({
//   value,
//   classNames,
//   className,
//   ...props
// }: CopyWithClassNamesProps) {
//   const [hasCopied, setHasCopied] = React.useState(false);

//   React.useEffect(() => {
//     setTimeout(() => {
//       setHasCopied(false);
//     }, 2000);
//   }, [hasCopied]);

//   const copyToClipboard = React.useCallback((value: string) => {
//     copyToClipboardWithMeta(value);
//     setHasCopied(true);
//   }, []);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           size="icon"
//           variant="ghost"
//           className={cn(
//             "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
//             className
//           )}
//         >
//           {hasCopied ? (
//             <CheckIcon className="h-3 w-3" />
//           ) : (
//             <CopyIcon className="h-3 w-3" />
//           )}
//           <span className="sr-only">Copy</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => copyToClipboard(value)}>
//           Component
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => copyToClipboard(classNames)}>
//           Classname
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// interface CopyNpmCommandButtonProps extends DropdownMenuTriggerProps {
//   commands: Required<NpmCommands>;
// }

// export function CopyNpmCommandButton({
//   commands,
//   className,
//   ...props
// }: CopyNpmCommandButtonProps) {
//   const [hasCopied, setHasCopied] = React.useState(false);

//   React.useEffect(() => {
//     setTimeout(() => {
//       setHasCopied(false);
//     }, 2000);
//   }, [hasCopied]);

//   const copyCommand = React.useCallback(
//     (value: string, pm: "npm" | "pnpm" | "yarn") => {
//       copyToClipboardWithMeta(value, {
//         name: "copy_npm_command",
//         properties: {
//           command: value,
//           pm,
//         },
//       });
//       setHasCopied(true);
//     },
//     []
//   );

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           size="icon"
//           variant="ghost"
//           className={cn(
//             "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
//             className
//           )}
//         >
//           {hasCopied ? (
//             <CheckIcon className="h-3 w-3" />
//           ) : (
//             <CopyIcon className="h-3 w-3" />
//           )}
//           <span className="sr-only">Copy</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem
//           onClick={() => copyCommand(commands.__npmCommand__, "npm")}
//         >
//           npm
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={() => copyCommand(commands.__yarnCommand__, "yarn")}
//         >
//           yarn
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={() => copyCommand(commands.__pnpmCommand__, "pnpm")}
//         >
//           pnpm
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
