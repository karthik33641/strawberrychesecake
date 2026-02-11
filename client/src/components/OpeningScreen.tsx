import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OpeningScreenProps {
  onComplete: (name: string) => void;
}

export default function OpeningScreen({ onComplete }: OpeningScreenProps) {
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => onComplete(name), 1000); // Allow exit animation
  };

  return (
    <AnimatePresence>
      {!isSubmitted && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1 }}
        >
          {/* Floating Background Hearts */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/20 pointer-events-none"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: -100,
                x: `calc(${Math.random() * 100}vw - 50vw)`,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            >
              <Heart fill="currentColor" size={Math.random() * 40 + 20} />
            </motion.div>
          ))}

          <motion.div
            className="z-10 w-full max-w-md p-8 text-center space-y-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="space-y-4">
              <h1 className="font-heading text-4xl md:text-5xl text-foreground">
                Before we start our story...
              </h1>
              <p className="font-script text-2xl text-muted-foreground">
                Excuse me miss, may I know your name?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                placeholder="Your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center text-xl h-14 rounded-full border-2 border-primary/20 focus-visible:ring-primary bg-white/50 backdrop-blur-sm font-heading placeholder:font-sans"
                autoFocus
              />
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 rounded-full text-lg font-bold bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                disabled={!name.trim()}
              >
                Start Our Story
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
