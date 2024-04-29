import { useEffect, useState } from "react";

const useAudio = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudio(new Audio("/bell.mp3"));
    }
  }, []);

  const playBell = () => {
    audio?.play();
  };

  return playBell;
};

export default useAudio;
