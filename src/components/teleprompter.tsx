import React, {
  HtmlHTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import stringSimilarity from "string-similarity";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

declare global {
  interface Window {
    webkitSpeechRecognition: any; // Adjust the type if you have access to the correct type definition
  }
}

interface TeleprompterProps extends React.ComponentPropsWithoutRef<"div"> {
  words: string[];
  progress: number;
  listening: boolean;
  onChange: (arg: any) => void;
  handleListening: () => void;
}

const cleanWord = (word: string) =>
  word
    .trim()
    .toLocaleLowerCase()
    .replace(/[^a-z]/gi, "");

export default function Teleprompter({
  words,
  progress,
  listening,
  handleListening,
  onChange,
}: TeleprompterProps) {
  const recog = React.useRef<SpeechRecognition | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [results, setResults] = useState<string>("");

  //   const {
  //     transcript,
  //     listening,
  //     resetTranscript,
  //     browserSupportsSpeechRecognition,
  //   } = useSpeechRecognition();

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    recog.current = new SpeechRecognition() as SpeechRecognition;
    (recog.current as SpeechRecognition).continuous = true;
    (recog.current as SpeechRecognition).interimResults = true;
  }, []);

  React.useEffect(() => {
    if (listening) {
      //   SpeechRecognition.startListening({ continuous: true });
      recog?.current?.start();
    } else {
      //   SpeechRecognition.stopListening();
      recog?.current?.stop();
    }
  }, [listening]);

  useEffect(() => {
    const handleResult = ({ results }: SpeechRecognitionEvent) => {
      const interim = Array.from(results)
        .filter((r) => !r.isFinal)
        .map((r) => r[0].transcript)
        .join(" ");
      setResults(interim);

      const newIndex = interim.split(" ").reduce((memo, word) => {
        if (memo >= words.length) {
          return memo;
        }
        const similarity = stringSimilarity.compareTwoStrings(
          cleanWord(word),
          cleanWord(words[memo])
        );
        memo += similarity > 0.75 ? 1 : 0;
        return memo;
      }, progress);
      if (newIndex > progress && newIndex <= words.length) {
        onChange(newIndex);
        if (newIndex === words.length) {
          handleListening();
        }
      }
    };
    recog.current?.addEventListener("result", handleResult);
    return () => {
      recog.current?.removeEventListener("result", handleResult);
    };
  }, [onChange, progress, words]);

  useEffect(() => {
    scrollRef.current
      ?.querySelector(`[data-index='${progress + 3}']`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
  }, [progress]);

  return (
    <React.Fragment>
      <div
        className="text-base w-full  h-48 overflow-y-auto tracking-widest scroll-smooth block mb-4 bg-transparent bg-no-repeat"
        ref={scrollRef}
      >
        {words.map((word, i) => (
          <span
            key={`${word}:${i}`}
            data-index={i}
            className={`${
              i < progress
                ? "text-primary transition-colors ease-linear duration-200"
                : "text-secondary"
            }`}
          >
            {word}{" "}
          </span>
        ))}
      </div>
      {results && <div className="flex-initial">{results}</div>}
    </React.Fragment>
  );
}
