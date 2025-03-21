// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/codeblock";
import { MemoizedReactMarkdown } from "@/components/markdown";
import { IconAssistant, IconOpenAI, IconUser } from "@/components/ui/icons";
import AudioPlayer from "./audio/audio-player";

export interface ChatMessageProps {
  message: {
    id?: string;
    content: string;
    role: "user" | "assistant";
    type: "audio" | "message";
  };
  index: number;
  isLoading: boolean;
}

export function ChatMessage({
  message,
  index,
  isLoading,
  ...props
}: ChatMessageProps) {
  // console.log(message);
  return (
    <div
      key={index}
      className={cn("group relative mb-4 flex items-start md:-ml-12")}
      {...props}
    >
      <div className="flex flex-col">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
            message.role === "user"
              ? "bg-background"
              : "bg-primary text-primary-foreground"
          )}
        >
          {message.role === "user" ? <IconUser /> : <IconAssistant />}
        </div>
        {/* <div className="font-semibold text-gray-800 dark:text-white">
          {message.role}
          state management to manage this state
        </div> */}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        {message.role === "user" ? (
          <>
            {message.type === "message" ? (
              <MemoizedReactMarkdown
                className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                remarkPlugins={[remarkGfm, remarkMath]}
                components={{
                  p({ children }) {
                    return <p className="mb-2 last:mb-0">{children}</p>;
                  },
                  code({ node, inline, className, children, ...props }) {
                    if (children.length) {
                      if (children[0] == "▍") {
                        return (
                          <span className="mt-1 cursor-default animate-pulse">
                            ▍
                          </span>
                        );
                      }

                      children[0] = (children[0] as string).replace("`▍`", "▍");
                    }

                    const match = /language-(\w+)/.exec(className || "");

                    if (inline) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }

                    return (
                      <CodeBlock
                        key={Math.random()}
                        language={(match && match[1]) || ""}
                        value={String(children).replace(/\n$/, "")}
                        {...props}
                      />
                    );
                  },
                }}
              >
                {message.content}
              </MemoizedReactMarkdown>
            ) : (
              <AudioPlayer
                key={index}
                isLoading={isLoading}
                url={message.content}
                idx={index}
              />
            )}
          </>
        ) : (
          <AudioPlayer
            key={index}
            isLoading={isLoading}
            url={message.content}
            idx={index}
          />
        )}
      </div>
    </div>
  );
}
