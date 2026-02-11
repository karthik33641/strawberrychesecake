import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Using the attached asset for Adore You
  const musicUrl = "/attached_assets/Harry_Styles_-_Adore_You_1770535091444.mp3"; 

  useEffect(() => {
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-white/90 backdrop-blur shadow-lg border-2 border-pink-200 hover:bg-pink-50"
        onClick={togglePlay}
      >
        {isPlaying ? <Volume2 className="text-pink-500" /> : <VolumeX className="text-stone-400" />}
      </Button>
    </div>
  );
}
