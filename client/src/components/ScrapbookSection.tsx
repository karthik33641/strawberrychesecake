import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScrapbookSectionProps {
  name: string;
}

export default function ScrapbookSection({ name }: ScrapbookSectionProps) {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const text = `Hey ${name}, remember how it all started? It feels like just yesterday...`;

  return (
    <section className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Photo Frame */}
        <motion.div
          initial={{ rotate: -5, scale: 0.8, opacity: 0 }}
          whileInView={{ rotate: -3, scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          className="relative bg-white p-6 shadow-2xl border border-stone-200 aspect-[4/5] flex flex-col"
        >
          {/* Tape corners from asset */}
          <div className="absolute -top-6 -left-6 w-32 h-16 pointer-events-none opacity-90 rotate-[-15deg] bg-[url('@assets/Tape_cute_pink_1770535091445.jpeg')] bg-contain bg-no-repeat" />
          <div className="absolute -bottom-6 -right-6 w-32 h-16 pointer-events-none opacity-90 rotate-[165deg] bg-[url('@assets/Tape_cute_pink_1770535091445.jpeg')] bg-contain bg-no-repeat" />

          <div className="flex-1 bg-stone-100 flex items-center justify-center overflow-hidden relative group border-4 border-stone-50">
            <img
              src="/couple_selfie.jpg"
              alt="Our Beginning"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="pt-8 pb-4 text-center font-script text-4xl text-stone-600">
            Our Beginning 💕
          </div>
        </motion.div>

        {/* Text Area */}
        <div className="space-y-8 bg-white/40 backdrop-blur-xl p-10 rounded-[40px] border-4 border-white/60 shadow-xl">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-script text-5xl text-pink-500"
          >
            Chapter One
          </motion.h2>

          <div className="font-heading text-2xl md:text-3xl leading-relaxed text-stone-700 min-h-[120px] italic">
            {textVisible && (
              <TypewriterText text={text} />
            )}
          </div>
        </div>
      </div>

      {/* Stickers floating around */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-20 w-40 h-40 bg-[url('@assets/Valentine’s_Day_wallpaper_💋💕_1770535091444.jpeg')] bg-contain bg-no-repeat opacity-20 pointer-events-none"
      />
    </section>
  );
}

function TypewriterText({ text }: { text: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
      }}
      aria-hidden
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
