import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

interface ProposalSectionProps {
  name: string;
}

export default function ProposalSection({ name }: ProposalSectionProps) {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    const range = 300;
    const x = (Math.random() - 0.5) * range * 2;
    const y = (Math.random() - 0.5) * range * 2;
    setNoBtnPosition({ x, y });
  };

  const handleAccept = () => {
    setIsAccepted(true);
    // Standard confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-b from-pink-50/50 to-pink-100/50 overflow-hidden"
    >
      {/* Constant Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={`bg-heart-${i}`}
            className="absolute text-pink-400/30"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: ["110%", "-10%"],
              x: [null, `${(Math.random() - 0.5) * 20 + 50}%`],
              opacity: [0, 0.8, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * -20
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Floating Celebration Items (Visible after YES) */}
      <AnimatePresence>
        {isAccepted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {/* Chocolate/Roses/Hearts */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`celebration-${i}`}
                initial={{
                  x: Math.random() * 100 + "%",
                  y: "110%",
                  rotate: 0,
                  opacity: 0
                }}
                animate={{
                  y: "-10%",
                  rotate: 720,
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 8 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute text-4xl"
              >
                {["🍫", "🌹", "❤️", "💐", "✨", "💖"][i % 6]}
              </motion.div>
            ))}

            {/* Glowing Heart Bubbles with sparkles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`bubble-${i}`}
                initial={{
                  x: Math.random() * 100 + "%",
                  y: "110%",
                  opacity: 0,
                  scale: 0.5
                }}
                animate={{
                  y: "-10%",
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                  filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
                  boxShadow: ["0 0 0px transparent", "0 0 20px rgba(244,114,182,0.8)", "0 0 0px transparent"]
                }}
                transition={{
                  duration: Math.random() * 6 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute text-pink-500/80 drop-shadow-[0_0_15px_rgba(244,114,182,1)]"
              >
                💖
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        {!isAccepted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-md p-12 rounded-3xl shadow-2xl border border-white/50"
          >
            <h2 className="font-script text-5xl md:text-6xl text-primary mb-6">
              {name}...
            </h2>
            <h3 className="font-heading text-3xl md:text-4xl text-stone-700 mb-12 leading-relaxed">
              Will you be my Valentine?
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative h-48">
              <Button
                size="lg"
                className="w-40 h-16 text-2xl rounded-full bg-pink-500 hover:bg-pink-600 shadow-lg shadow-pink-200 animate-pulse hover:animate-none transform transition-transform hover:scale-110 z-20"
                onClick={handleAccept}
              >
                YES 💖
              </Button>

              <motion.div
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                transition={{
                  type: "spring",
                  stiffness: 1000,
                  damping: 15,
                  mass: 0.1
                }}
                onMouseEnter={moveNoButton}
                className="z-10"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-40 h-16 text-xl rounded-full bg-stone-200 hover:bg-stone-300 text-stone-500"
                >
                  NO 🙄
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: 1
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.8 }
              }}
              className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border-4 border-pink-200"
            >
              <h1 className="font-script text-3xl md:text-5xl text-primary mb-2 leading-tight drop-shadow-sm">
                Happy Valentine’s Day Dishika ❤️💋💐
              </h1>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0, rotate: -5 }}
              animate={{
                y: [0, -15, 0],
                rotate: [-5, 5, -5],
                opacity: 1
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 1 }
              }}
              className="relative group"
            >
              <div className="absolute -inset-8 bg-pink-400/30 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src="/outdoor_memory.jpg"
                alt="Our Memory"
                className="max-w-md w-full rounded-3xl shadow-[0_0_50px_rgba(244,114,182,0.6)] border-8 border-white relative z-10"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
