import { useState } from "react";
import OpeningScreen from "@/components/OpeningScreen";
import ScrapbookSection from "@/components/ScrapbookSection";
import BadmintonGame from "@/components/BadmintonGame";
import LoveCardsSection from "@/components/LoveCardsSection";
import ProposalSection from "@/components/ProposalSection";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [name, setName] = useState<string | null>(null);

  // For development testing, you can uncomment this to skip the name entry:
  // const [name, setName] = useState<string | null>("Valentine");

  return (
    <div className="min-h-screen font-body text-foreground bg-background selection:bg-pink-200 selection:text-pink-900">
      <MusicPlayer />
      
      {!name ? (
        <OpeningScreen onComplete={setName} />
      ) : (
        <main className="animate-in fade-in duration-1000">
          <ScrapbookSection name={name} />
          <BadmintonGame />
          <LoveCardsSection />
          <ProposalSection name={name} />
          
          <footer className="py-8 text-center text-stone-400 text-sm font-pixel">
            Made with ❤️ for you
          </footer>
        </main>
      )}
    </div>
  );
}
