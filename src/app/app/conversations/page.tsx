"use client";
import {
  ChangeEventHandler,
  Dispatch,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useChat, useCompletion, type UseChatHelpers } from "ai/react";
import { ChatRequestOptions, type Message } from "ai";
import { Button } from "@/components/ui/button";
import { PromptForm } from "@/components/ui/prompt-form";
import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import { ChatScrollAnchor } from "./components/chat-scroll-anchor";
import { EmptyChatOutput } from "./components/empty-chatoutput";
import { ChatMessage } from "./components/chat-message";
import AudioPlayer from "./components/audio-player";
import { addConversation } from "@/lib/api";
import Loader from "@/components/ui/loader";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { StopIcon } from "@radix-ui/react-icons";
import { Mic } from "lucide-react";
import { useReactMediaRecorder } from "react-media-recorder";

export interface AudioResource {
  blob: string;
}

/**
 *  Notes - 27th August
 * 
 * Create a UI for template


Under conversations: It shows the name of that.

Pass the prompt identifier in body so backend can insert the relevant system prompt


 */

const Conversations = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const [customMessages, setCustomMessages] = useState<any>([]);

  useEffect(() => {
    async function fetchConversations() {
      console.log("Testing Conversation API");
      setIsLoading(true);

      try {
        const response = await fetch(`/api/conversations/1`);

        const { conversations, conversationsRaw } = await response.json();

        console.log(conversations);
        setIsLoading(false);

        // TODO: Also call setMessages from Open AI here so it can have the context for the next messages
        // Problem to Solve Here: Message Types can be audio too so it would be wise to save conversations in raw format too like ConversationsRaw, having same columns like Conversations.
        // Fetch data from both Conversations & ConversationsRaw in this API
        // and then we can do setMessages(conversationRawResponse.message) & setCustomMessages(conversationResponse.messages)

        if (conversations.length > 0) {
          setCustomMessages(conversations);
        }
      } catch (err) {
        setIsLoading(false);
        // properly handle this error with client redirect error or error boundaries
        console.error("Fetching Conversation Error", JSON.stringify(err));
      }
    }
    fetchConversations();
  }, []);

  const convertToSpeech = async (msg: Message) => {
    const response = await fetch("/api/convert-tts", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": "d53ff1e7334b4f256e4d57f2e61c54c8",
        accept: "audio/mpeg",
      },
      body: JSON.stringify({ msg: msg.content, conversationTypeId: 1 }),
    });
    // .then((res) => res.json());

    if (response.ok) {
      const audioBlob = await response.blob();

      const audioBlobUrl = URL.createObjectURL(audioBlob);
      console.log("Audio URL", audioBlobUrl);
      setCustomMessages((custom: any) => {
        return custom.map((customMessage: any) => {
          if (customMessage.content === "temp")
            customMessage = {
              role: "assistant",
              content: audioBlobUrl,
              type: "audio",
            };
          return customMessage;
        });
      });

      setIsConverting(false);

      // first implement then iterate otherwise I distracted
      // TODO: Handle case if this API call fails. User should see information that this doesnt work or retry?
      // await addConversation({
      //   role: "assistant",
      //   content: audioPath,
      //   type: "audio",
      // });
    } else {
      console.log("Error", JSON.stringify(response));
      console.error("Failed to convert text to speech");
    }

    // setAudio((prev) => [...prev, response.blob()]);
  };

  const {
    messages,
    input,
    handleInputChange,

    setMessages,
    data,
    append,
    error,
    handleSubmit,
    stop,
    reload,
    setInput,
  } = useChat({ onFinish: async (msg) => await convertToSpeech(msg) });

  // const { completion, input, setInput, handleInputChange, handleSubmit } =
  //   useCompletion();

  const Icon = status === "recording" ? Square : Mic;

  // async function handleRecordClick() {
  //   try {
  //     if (status === "idle") {
  //       await llm.record();
  //       setStatus("recording");
  //     } else if (status === "recording") {
  //       setStatus("transcribing");
  //       const { audioUrl } = await llm.stopRecording();
  //       const { text } = await llm.transcribe({ audioUrl });
  //       setStatus("streaming");
  //       const newHistory = [...history, { role: "user", content: text }];
  //       setHistory(newHistory);
  //       const { message } = await llm.chat({
  //         messages: newHistory,
  //         stream: true,
  //         onStream: ({ message }) => setHistory([...newHistory, message]),
  //       });
  //       setHistory([...newHistory, message]);
  //       setStatus("idle");
  //     }
  //   } catch (error: any) {
  //     console.error(error);
  //     window.alert("Something went wrong! " + error.message);
  //   }
  // }
  const id = "random-1"; // used to identify chats

  return (
    <div className="relative flex max-w-screen-xl flex-col space-y-12 pt-8 px-8 flex-1 h-full">
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <>
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Personal Life Coach</h3>
          </div>

          <div className={cn("flex-1 pt-4 md:pt-10 overflow-y-auto")}>
            {customMessages.length ? (
              <>
                <ChatList
                  messages={messages}
                  customMessages={customMessages}
                  isLoading={isConverting}
                />
                <ChatScrollAnchor trackVisibility={isConverting} />
              </>
            ) : (
              <EmptyChatOutput setInput={setInput} />
            )}
          </div>

          <ChatPanel
            id={id}
            stop={stop}
            append={append}
            reload={reload}
            messages={messages}
            input={input}
            setInput={setInput}
            setCustomMessages={setCustomMessages}
            setMessages={setMessages}
            setIsConverting={setIsConverting}
            isLoading={isConverting}
          />
        </>
      )}{" "}
    </div>
  );
};

export default Conversations;

export const MicCustom = () => (
  // you can also use an icon library like `react-icons` here
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" x2="12" y1="19" y2="22"></line>
  </svg>
);

export const Square = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
  </svg>
);

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

type Status = "idle" | "recording" | "transcribing" | "streaming";

function getInputPlaceholder(status: Status) {
  switch (status) {
    case "idle":
      return "Ask me anthing...";
    case "recording":
      return "Recording audio...";
    case "transcribing":
      return "Transcribing audio...";
    case "streaming":
      return "Wait for my response...";
  }
}

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string;
  audio?: string[];
  setCustomMessages: Dispatch<any>;
  setMessages: (messages: Message[]) => void;
  setIsConverting: Dispatch<boolean>;
}

function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  setMessages,
  setIsConverting,
  setCustomMessages,
}: ChatPanelProps) {
  /**
   * media blob url => converted to audioBlob and sent in API to whisper for transcription from frontend
   *
   */

  // const {
  //   startRecording,
  //   stopRecording,
  //   togglePauseResume,
  //   recordingBlob,
  //   isRecording,
  //   isPaused,
  //   recordingTime,
  //   mediaRecorder,
  // } = useAudioRecorder();

  // whisper request
  const whisperRequest = async (audioFile: Blob) => {
    console.log(audioFile.type);
    const formData = new FormData();
    formData.append("file", audioFile, "audio.wav");
    try {
      const response = await fetch("/api/convert-stt", {
        method: "POST",
        body: formData,
      });
      const { text, error } = await response.json();
      if (response.ok) {
        append(text);
      } else {
        console.log("Something went wrong", JSON.stringify(error));
      }
    } catch (error) {
      console.log({ error });

      if (typeof error === "string") {
        // setError(error);
        console.log("Error:", error);
      }
      if (error instanceof Error) {
        // setError(error.message);
        console.log("Error:", error);
      }
      console.log("Error:", error);
    }
  };

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      mediaRecorderOptions: { mimeType: "audio/wav" },
      blobPropertyBag: { type: "audio/mpeg" },
    });

  useEffect(() => {
    if (!mediaBlobUrl) return;

    (async () => {
      // User recorded an audio instead of typing

      const audioBlob = await fetch(mediaBlobUrl).then((audio) => audio.blob());
      const file = new File([audioBlob], `test.wav`, {
        type: "audio/wav",
        lastModified: Date.now(),
      });

      const wavFile = URL.createObjectURL(file);
      // const audioRecordingUrl = URL.createObjectURL(recordingBlob);
      const newUserAudioRecording = {
        id,
        content: wavFile,
        role: "user",
      };

      setCustomMessages((prev: any) => [
        ...prev,
        { ...newUserAudioRecording, type: "audio" },
        { role: "assistant", content: "temp" }, // loading state for agent response
      ]);
      // const audioBlob = await fetch(mediaBlobUrl).then((audio) => audio.blob());
      await whisperRequest(audioBlob);
    })();

    // record();

    // recordingBlob will be present at this point after 'stopRecording' has been called
  }, [mediaBlobUrl]);

  return (
    <div className="w-full relative flex justify-between border overflow-y-auto gap-4 pr-4 items-center bg-black shadow-backlight shadow-slate-400">
      {/* <div className="flex gap-4 w-full"> */}
      <PromptForm
        onSubmit={async (value) => {
          const messageToAppend = {
            id,
            content: value,
            role: "user",
          } as Message;
          console.log(messageToAppend);
          setCustomMessages((prev: any) => [
            ...prev,
            { ...messageToAppend, type: "message" },
            { role: "assistant", content: "temp" },
          ]);
          await addConversation({ ...messageToAppend, type: "message" });
          await append(messageToAppend);
          setIsConverting(true);
        }}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
      />
      {/* <AudioRecorder
        onRecordingComplete={(audioBlob) => console.log("complete")}
        classes={{
          AudioRecorderClass: "bg-black",
          AudioRecorderStartSaveClass: "bg-black text-white",
        }}
        showVisualizer={false}
      /> */}
      <Button
        size="icon"
        variant="outline"
        className="rounded-full border-2 "
        onClick={
          status === "recording" ? () => stopRecording() : startRecording
        }
        // disabled={!allowStop}
      >
        {status === "recording" ? (
          <StopIcon color="red" />
        ) : (
          <Mic color="green" />
        )}
      </Button>
      {/* <p
          className={cn(
            "px-2 text-center text-xs leading-normal text-muted-foreground"
          )}
        >
          Powered by ElevenLabs & OpenAI .
        </p> */}
    </div>
    // </div>
  );
}

export interface ChatList {
  messages: Message[];
  isLoading: boolean;
  customMessages: [
    {
      id?: string;
      content: string;
      role: "user" | "assistant";
      type: "audio" | "message";
    }
  ];
}

export function ChatList({ isLoading, customMessages }: ChatList) {
  if (!customMessages.length) {
    return null;
  }

  // console.log("Audio", customMessages);

  return (
    <div className="relative mx-auto max-w-3xl px-4">
      {customMessages.map((message, index) => (
        <div key={index}>
          <ChatMessage
            key={index}
            index={index}
            message={message}
            isLoading={isLoading}
          />
          {index < customMessages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  );
}
