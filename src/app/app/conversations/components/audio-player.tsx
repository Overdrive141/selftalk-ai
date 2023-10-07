import React, { useState } from "react";
import { AudioResource } from "../page";

interface Props {
  audioBlob: string;
}

const AudioPlayer: React.FC<Props> = ({ audioBlob }) => {
  const [isPlayingIndex, setIsPlayingIndex] = useState<number | null>(null);

  const togglePlay = (index: number) => {
    setIsPlayingIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <div>
        <audio controls>
          <source src={audioBlob} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        {/* <button onClick={() => togglePlay(?index)}> */}
        {/* {isPlayingIndex === index ? "Pause" : "Play"} */}
        {/* </button> */}
      </div>
    </div>
  );
};

export default AudioPlayer;
