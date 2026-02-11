import { motion } from "framer-motion";

const CARDS = [
  { text: "Your smile lights up my entire world 🌍" },
  { text: "How you have my back no matter what" },
  { text: "How you always care about me" },
  { text: "How you handle me, even when I’m being mean, dumb, or rage-baiting" },
  { text: "The way your eyes sparkle when you're happy ✨" },
  { text: "Everything about you, honestly. ❤️" }
];

export default function LoveCardsSection() {
  return (
    <section className="min-h-screen py-20 px-4 bg-[#fff5f7] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Enhanced Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/40"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%",
              scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
              y: "-10%",
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <h2 className="font-heading text-4xl md:text-5xl text-center text-primary mb-16">
          Things I Love About You 💗
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CARDS.map((card, index) => (
            <LoveCard key={index} text={card.text} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LoveCard({ text, index }: { text: string; index: number }) {
  const rotate = index % 2 === 0 ? 2 : -2;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        zIndex: 10,
        boxShadow: "0 25px 30px -5px rgb(244 114 182 / 0.2)" 
      }}
      className={`
        bg-white p-8 rounded-3xl shadow-lg border-2 border-pink-50 flex items-center justify-center min-h-[220px] cursor-pointer
        transform transition-all duration-300 relative overflow-hidden group
      `}
      style={{ rotate: `${rotate}deg` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <p className="text-center text-stone-700 leading-relaxed relative z-10 font-script text-3xl md:text-4xl">
        {text}
      </p>
      
      <div className="absolute top-4 right-4 text-pink-200 group-hover:text-pink-400 transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    </motion.div>
  );
}
