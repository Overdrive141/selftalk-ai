"use client";

import { Mic } from "lucide-react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import Teleprompter from "@/components/teleprompter";
import { StopIcon } from "@radix-ui/react-icons";

import { useReactMediaRecorder } from "react-media-recorder";

const INITIAL_TEXT = `
Positive self affirmations are the first step to building confidence.
Today will be a productive day. I am intelligent and focused
I do not waste away a single day of my life. I squeeze every ounce of value out of each of my days on this planet. Today, tomorrow, and everyday.
I must remember the incredible power I possess within me to achieve anything I desire.
I belong in this world; there are people that care about me and my worth.
My past might be ugly, but I am still beautiful.
I have made mistakes, but I will not let them define me.
My soul radiates from the inside and warms the souls of others.
Note to self: I am going to make you so proud.
I finish what matters and let go of what does not.
I feed my spirit. I train my body. I focus my mind. This is my time.
My life has meaning. What I do has meaning. My actions are meaningful and inspiring.
What I have done today was the best I was able to do today. And for that, I am thankful.
One small positive thought in the morning can change my whole day. So, today I rise with a powerful thought to set the tone and allow success to reverberate through every moment of my day.
I set goals and go after them with all the determination I can muster. When I do this, my own skills and talents will take me to places that amaze me.
Happiness is a choice, and today I choose to be happy.`;

interface TrainingModalProps extends React.ComponentPropsWithoutRef<"div"> {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setVoiceRegistered: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const TrainingModal = ({ setOpen, setVoiceRegistered }: TrainingModalProps) => {
  const [listening, setListening] = useState(false);
  const [words, setWords] = useState(INITIAL_TEXT.split(" "));
  const [progress, setProgress] = useState(0);
  const [wasStopped, setWasStopped] = useState<boolean>(false);
  const [allowStop, setAllowStop] = useState<boolean>(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: { type: "audio/mpeg" },
    });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWords(e.target.value.split(" "));
    progress && setProgress(0);
  };

  const handleSubmit = async (e: MouseEvent) => {
    if (mediaBlobUrl) {
      const audioBlob = await fetch(mediaBlobUrl).then((audio) => audio.blob());
      const fileName = `registration-${Date.now()}`;
      const audioFile = new File([audioBlob], `${fileName}`, {
        lastModified: new Date().getTime(),
        type: audioBlob.type,
      });
      // console.log(audioFile);
      const formData = new FormData();
      formData.append("name", fileName);
      formData.append("files", audioFile);
      const response = await fetch("/api/register-voice", {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          // "xi-api-key": "d53ff1e7334b4f256e4d57f2e61c54c8",
          // accept: "application/json",
        },
        // body: JSON.stringify({ name: fileName, files: audioFile }),
        body: formData,
      });

      console.log(response.json());
      // const tmp = new Audio(mediaBlobUrl); //passing your state (hook)
      // tmp.play(); //simple play of an audio element.

      setVoiceRegistered(true);
      setOpen(false);
    }
  };

  // allow to stop only when 1 min 30 seconds passed

  const handleListening = () => {
    if (listening) {
      // stopped
      setWasStopped(true);
      setListening(false);
      setAllowStop(true);
      stopRecording();
    } else {
      setProgress(0);
      setListening(true);
      setAllowStop(false);
      startRecording();
      timerRef.current = setInterval(() => {
        setAllowStop(true);
      }, 90000);
    }
  };

  const handleReset = () => {
    setProgress(0);
    setWasStopped(false);
    setAllowStop(true);
    clearBlobUrl();
  };

  const handleChange = (newProgress: number) => setProgress(newProgress);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Register Voice</DialogTitle>
        <DialogDescription>
          {listening
            ? "Keep speaking..."
            : "Click the microphone when you are ready"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          {/* <Label htmlFor="url"></Label> */}
          {/* <Input
            className="h-20 bg-transparent w-full p-6 overflow-scroll"
            onChange={handleInput}
            value={words.join(" ")}
          /> */}

          <Teleprompter
            words={words}
            listening={listening}
            progress={progress}
            onChange={handleChange}
            handleListening={handleListening}
          />

          <div className="flex items-center justify-center gap-4">
            {!wasStopped ? (
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-2"
                onClick={handleListening}
                disabled={!allowStop}
              >
                {listening ? (
                  <StopIcon color="red" />
                ) : (
                  <div className="">
                    <Mic color="green" />
                  </div>
                )}
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  // className="w-28"
                  onClick={handleReset}
                  disabled={listening}
                >
                  Reset
                </Button>

                <Button
                  variant={"default"}
                  className="w-28"
                  onClick={async (e) =>
                    handleSubmit(e).then(() => setOpen(false))
                  }
                >
                  Submit
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <DialogFooter>
        <Button size="icon">Import Podcast</Button>
      </DialogFooter> */}
    </>
  );
};

export { TrainingModal };
