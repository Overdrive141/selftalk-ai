import * as React from "react";

import useAudio from "../../hooks/useAudio";
import TimeBar from "./timebar";
import PlaybackButton from "./playback-button";

function AudioPlayer({ url, idx, isLoading }) {
  const [audioElement, audioProps] = useAudio(url, idx);

  if (url === "temp") return;

  return (
    <div className="audio-player border px-4 py-2 rounded-lg" key={idx}>
      {audioElement}

      {isLoading || audioProps.isLoading ? (
        <div className="flex">
          <span className="circle animate-loader"></span>
          <span className="circle animate-loader animate-delay-150"></span>
          <span className="circle animate-loader animate-delay-500"></span>
        </div>
      ) : (
        <div className="controls">
          <PlaybackButton
            onClick={audioProps.togglePlaybackStatus}
            playbackStatus={audioProps.playbackStatus}
          />
          <TimeBar
            currentTime={audioProps.currentTime}
            isSeeking={audioProps.isSeeking}
            duration={audioProps.duration}
            progress={audioProps.progress}
            setTime={audioProps.setTime}
          />
        </div>
      )}
    </div>
  );
}

export default AudioPlayer;
