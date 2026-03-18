// hooks/useSound.ts
import { useEffect, useRef } from "react";

const useSound = (src: string, volume = 0.3) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = volume;
  }, [src, volume]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return play;
};

export default useSound;
