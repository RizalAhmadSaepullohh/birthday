import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { contentConfig } from '../config/contentConfig';

const Slide_Bouquet = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const data = contentConfig.texts.slideBouquet;

  const triggerFloralConfetti = () => {
    // Flower petal colors: pastel pink, rose, peach, lavender, warm gold
    const colors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#E6E6FA', '#FFD700', '#FF7F50', '#FFF0F5'];

    // Burst from center
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors,
      scalar: 1.2,
      ticks: 200,
      shapes: ['circle'],
      disableForReducedMotion: true
    });

    // Side canons for full blooming sensation
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.7 },
        colors: colors,
        scalar: 1.1
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.7 },
        colors: colors,
        scalar: 1.1
      });
    }, 250);
  };

  const handleTap = () => {
    if (!isRevealed) {
      setIsRevealed(true);
    }
    triggerFloralConfetti();
  };

  return (
    <div 
      className="w-full h-full bg-gradient-to-b from-[#1a0814] via-[#12050f] to-black flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden select-none cursor-pointer"
      onClick={handleTap}
    >
      {/* Dreamy ambient light / bokeh glows */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating floral petals in the background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/40 text-base sm:text-xl"
            initial={{
              x: `${(i * 9 + 5) % 95}vw`,
              y: '-10%',
              rotate: 0,
              opacity: 0
            }}
            animate={{
              y: '110vh',
              rotate: 360,
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 8 + (i % 5) * 2,
              repeat: Infinity,
              delay: (i * 0.8) % 6,
              ease: 'linear'
            }}
          >
            {i % 3 === 0 ? '🌸' : i % 3 === 1 ? '✨' : '💖'}
          </motion.div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto my-auto flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* BEFORE REVEAL: Tap prompt with animated gift */
            <motion.div
              key="mystery-box"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.08, 1],
                  rotate: [0, -3, 3, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                className="relative mb-6 cursor-pointer"
              >
                {/* Glowing halo */}
                <div className="absolute inset-0 rounded-full bg-pink-500/30 blur-2xl animate-pulse" />
                
                {/* Gift box icon container */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-400 p-[2px] shadow-[0_0_40px_rgba(255,105,180,0.4)]">
                  <div className="w-full h-full bg-[#1e0a18] rounded-[22px] flex items-center justify-center">
                    <Gift className="w-14 h-14 sm:w-16 sm:h-16 text-pink-300" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Floating sparkles */}
                <motion.div
                  className="absolute -top-2 -right-2 text-yellow-300"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles size={24} />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 text-pink-400"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Heart size={22} fill="currentColor" />
                </motion.div>
              </motion.div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                {data.promptTitle}
              </h3>
              
              <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-400/30 text-pink-200 px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold shadow-lg backdrop-blur-md">
                <span>{data.promptSubtitle}</span>
              </div>
            </motion.div>
          ) : (
            /* AFTER REVEAL: Full blooming flower bouquet */
            <motion.div
              key="bouquet-revealed"
              initial={{ opacity: 0, scale: 0.6, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 14, stiffness: 90 }}
              className="flex flex-col items-center justify-center w-full"
            >
              {/* Header Title */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-3 sm:mb-4"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 tracking-tight leading-tight drop-shadow">
                  {data.revealedTitle}
                </h2>
              </motion.div>

              {/* Flower Bouquet Photo Frame */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(255,105,180,0.35)] border-2 sm:border-4 border-pink-300/40 bg-black/40"
              >
                <img
                  src={data.bouquetImage}
                  alt="Special Flower Bouquet"
                  className="w-56 h-72 min-[380px]:w-64 min-[380px]:h-80 sm:w-72 sm:h-96 md:w-80 md:h-[26rem] object-cover"
                />

                {/* Subtle soft vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
              </motion.div>

              {/* Message Note */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xs min-[380px]:text-sm sm:text-base text-pink-100/90 font-medium max-w-xs sm:max-w-sm mt-3 sm:mt-4 leading-snug drop-shadow"
              >
                {data.revealedMessage}
              </motion.p>

              {/* Tap prompt reminder */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ delay: 1.2, duration: 3, repeat: Infinity }}
                className="text-[11px] sm:text-xs text-pink-300/70 font-semibold mt-2 uppercase tracking-widest"
              >
                {data.tapAgainText}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Slide_Bouquet;
