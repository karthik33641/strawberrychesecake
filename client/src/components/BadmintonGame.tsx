import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

import pixelGirl from "@/assets/images/pixel-girl.png";
import pixelBoy from "@/assets/images/pixel-boy.png";
import pixelBoyHit from "@/assets/images/pixel-boy-hit.png";
import pixelShuttlecock from "@/assets/images/pixel-shuttlecock.png";

export default function BadmintonGame() {
  const [madnessLevel, setMadnessLevel] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [boyState, setBoyState] = useState<"idle" | "hit">("idle");
  const [combo, setCombo] = useState(0);
  const [message, setMessage] = useState("");
  
  const girlControls = useAnimation();
  const birdControls = useAnimation();
  const boyControls = useAnimation();
  const screenControls = useAnimation();

  const resetGame = async () => {
    setMadnessLevel(0);
    setCombo(0);
    setMessage("");
    setBoyState("idle");
    girlControls.set({ rotate: 0 });
    birdControls.set({ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 });
    boyControls.set({ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 });
    screenControls.set({ x: 0 });
    setIsAnimating(false);
  };

  const performHit = async (intensity: number, isLoop = false) => {
    if (!isLoop) setIsAnimating(true);

    setMadnessLevel((prev) => prev + (intensity === 9999 ? 100 : intensity));
    
    // 1. Swing Animation (Super Smooth)
    await girlControls.start({
      rotate: [0, -35, 75, 0],
      transition: { duration: 0.12, ease: "circOut" },
    });

    // 2. Shuttlecock Arc (Physics optimized)
    const birdDuration = intensity >= 10000 ? 0.22 : 0.35;
    birdControls.start({
      x: [0, 480],
      y: [0, -120, 0], 
      rotate: [0, 720],
      scale: [1, 1.4, 1],
      transition: { duration: birdDuration, ease: "linear" },
    });

    // 3. Impact
    await new Promise((r) => setTimeout(r, birdDuration * 850)); 
    
    setBoyState("hit");
    
    // Hit effects based on intensity
    if (intensity >= 10000) {
      screenControls.start({
        x: [-20, 20, -20, 20, -10, 10, 0],
        transition: { duration: 0.25 },
      });
      boyControls.start({
        rotate: [0, 360, 720],
        y: [0, -100, 0],
        scale: [1, 1.5, 0.8, 1],
        transition: { duration: 0.5 },
      });
      setCombo(prev => prev + 5);
      setMessage("ULTRA SMASH! 🔥");
    } else if (intensity >= 1000) {
      boyControls.start({
        rotate: [0, 360 * 2],
        y: [0, -60, 0],
        transition: { duration: 0.5, ease: "backOut" },
      });
      setMessage("DIZZY COMBO! 💫");
    } else if (intensity === 9999) {
      setMessage("MERCY??? 😱");
      boyControls.start({
        x: [0, 25, -25, 0],
        scale: [1, 1.2, 0.7, 1],
        transition: { duration: 0.15 },
      });
    } else {
      boyControls.start({
        x: [0, 100, 0],
        rotate: [0, 60, 0],
        transition: { duration: 0.4, type: "spring", stiffness: 400 },
      });
      setMessage("He deserved that. ✨");
    }

    // Reset bird quickly
    birdControls.set({ opacity: 0 });
    birdControls.set({ x: 0, y: 0, opacity: 1 });
    
    if (!isLoop) {
       setTimeout(() => {
         setBoyState("idle");
         setIsAnimating(false);
         setCombo(0);
       }, 800);
    }
  };

  const handleInfinite = async () => {
    setIsAnimating(true);
    for (let i = 0; i < 20; i++) {
        await performHit(9999, true);
        await new Promise(r => setTimeout(r, 40));
    }
    setMessage("He still loves you though! ❤️");
    setBoyState("idle");
    setIsAnimating(false);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black/80">
      {/* Dynamic Grid */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
            backgroundImage: `linear-gradient(transparent 98%, #ff69b4 98%),
                              linear-gradient(90deg, transparent 98%, #ff69b4 98%)`,
            backgroundSize: "50px 50px",
            transform: "perspective(800px) rotateX(45deg) translateY(-200px) scale(2)",
        }}
      />
      
      <motion.div 
        animate={screenControls}
        className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-xl border-8 border-pink-400/50 rounded-3xl p-8 shadow-[0_0_50px_rgba(255,105,180,0.3)] overflow-hidden"
      >
        {/* HUD */}
        <div className="flex justify-between items-center mb-12 font-pixel text-white">
          <div className="bg-pink-600/50 p-4 rounded-lg border-2 border-pink-400">
            <div className="text-[10px] mb-1">MADNESS SCORE</div>
            <div className="text-2xl text-yellow-300">{madnessLevel.toLocaleString()}</div>
          </div>
          <div className="text-center px-4">
             <h2 className="text-xs md:text-sm text-pink-500 uppercase tracking-tighter leading-relaxed font-bold">
                How many times did RAM make you mad?<br/>Now beat the shi out of him 😤🏸
             </h2>
          </div>
          <div className="w-32 h-16 flex items-center justify-center">
             <AnimatePresence>
               {combo > 0 && (
                 <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1.2, rotate: 10 }}
                    exit={{ scale: 0 }}
                    className="text-yellow-400 text-2xl font-bold italic drop-shadow-lg"
                 >
                    COMBO x{combo}!!
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>

        {/* Game Stage */}
        <div className="relative h-80 w-full bg-gradient-to-t from-pink-900/40 to-transparent rounded-2xl border-4 border-white/20 mb-10 flex items-end justify-between px-10 md:px-24 pb-12 overflow-hidden">
             
             {/* Message Box */}
             <AnimatePresence mode="wait">
               {message && (
                 <motion.div
                   key={message}
                   initial={{ y: 20, opacity: 0, scale: 0.5 }}
                   animate={{ y: -120, opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, y: -180 }}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-full"
                 >
                    <h3 className="font-pixel text-2xl md:text-4xl text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] text-center">
                        {message}
                    </h3>
                 </motion.div>
               )}
             </AnimatePresence>

             {/* Characters */}
             <motion.div className="relative z-20 w-32 md:w-40 aspect-square">
                 <motion.img 
                    src={pixelGirl} 
                    className="w-full h-full object-contain image-pixelated drop-shadow-2xl"
                    animate={girlControls}
                    style={{ originX: 0.9, originY: 0.9 }}
                 />
             </motion.div>

             <motion.div 
                animate={birdControls}
                className="absolute left-40 bottom-24 z-10 w-10 md:w-14 aspect-square pointer-events-none"
             >
                 <img src={pixelShuttlecock} className="w-full h-full object-contain image-pixelated" />
             </motion.div>

             <motion.div 
                className="relative z-20 w-32 md:w-40 aspect-square flex flex-col items-center"
                animate={boyControls}
             >
                 <div className="absolute -top-10 font-pixel text-xs text-yellow-300 bg-black/50 px-2 py-1 rounded border border-yellow-300/30">RAM</div>
                 <img 
                    src={boyState === "idle" ? pixelBoy : pixelBoyHit} 
                    className="w-full h-full object-contain image-pixelated drop-shadow-2xl"
                 />
             </motion.div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <GameButton value={100} onClick={() => performHit(100)} label="SLIGHT MAD" color="bg-pink-400" />
            <GameButton value={1000} onClick={() => performHit(1000)} label="ANNOYED" color="bg-pink-600" />
            <GameButton value={10000} onClick={() => performHit(10000)} label="VERY MAD!" color="bg-rose-600" />
            <GameButton value="INFINITE" onClick={handleInfinite} label="EXPLODE!! 💥" color="bg-stone-800" variant="danger" />
        </div>

        <div className="mt-10 flex justify-center">
             <Button 
                variant="ghost" 
                onClick={resetGame}
                className="text-pink-300 hover:text-white font-pixel text-[10px] flex items-center gap-3 bg-white/5 px-6 py-6 rounded-full border border-white/10 hover:bg-white/10 transition-all"
             >
                <RefreshCw size={14} className="animate-spin-slow" />
                Okay okay I'm sorry 😭
             </Button>
        </div>

      </motion.div>
    </section>
  );
}

function GameButton({ value, onClick, label, color }: any) {
    return (
        <motion.button
            whileHover={{ scale: 1.05, y: -6 }}
            whileTap={{ scale: 0.9, y: 0 }}
            onClick={onClick}
            className={`
                relative h-28 rounded-3xl border-b-[12px] font-pixel flex flex-col items-center justify-center gap-3 transition-all cursor-pointer
                ${color} border-black/20 text-white shadow-xl
            `}
        >
            <span className="text-xl md:text-3xl drop-shadow-md">{value}</span>
            <span className="text-[10px] opacity-90 font-sans font-bold uppercase tracking-tighter">{label}</span>
        </motion.button>
    )
}
