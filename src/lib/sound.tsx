import { createContext, useContext, useState, useEffect } from "react";

type SoundContextType = {
  isMuted: boolean;
  toggleMute: () => void;
  playHoverTick: () => void;
};

export const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
  playHoverTick: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context only on first interaction to respect browser policies
    const initAudio = () => {
      if (!audioCtx) {
        setAudioCtx(new (window.AudioContext || (window as any).webkitAudioContext)());
      }
    };
    window.addEventListener("click", initAudio, { once: true });
    return () => window.removeEventListener("click", initAudio);
  }, [audioCtx]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const playHoverTick = () => {
    if (isMuted || !audioCtx) return;
    
    // Synthesize a very short, high-frequency "tick" sound
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioCtx.currentTime); // High pitch
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05); // Rapid drop
    
    // Very short volume envelope
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playHoverTick }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSoundSystem = () => useContext(SoundContext);
