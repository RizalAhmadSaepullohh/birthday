import React from 'react';
import { motion } from 'framer-motion';
import { contentConfig } from '../config/contentConfig';

const Slide07_LanyEra = () => {
  return (
    <div className="w-full h-full bg-[var(--color-spotify-dark)] flex flex-col items-center justify-center px-4 py-8 sm:p-8 relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-wrap-pink)] via-[var(--color-spotify-dark)] to-[var(--color-spotify-dark)] opacity-40" />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md my-auto flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center"
        >
          The Best Memories All Of the Time.
        </motion.p>

        {/* Music Album Card mimicking Spotify UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, type: 'spring', bounce: 0.4 }}
          className="bg-zinc-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl border border-zinc-700"
        >
          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
              <img src={contentConfig.photos.slide07[0]} alt="Album Cover" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-black text-lg sm:text-2xl tracking-tight truncate">Naraida Tomoko</h3>
              <p className="text-gray-400 font-semibold text-xs sm:text-base mt-0.5 sm:mt-1">2026</p>
              <p className="text-gray-300 font-medium text-xs sm:text-sm mt-1 leading-snug line-clamp-3">A beautiful, cute, adorable, and smart girl who’s always full of energy</p>
            </div>
          </div>
          
          {/* Fake Progress Bar */}
          <div className="mt-5 sm:mt-8">
            <div className="w-full h-1.5 bg-zinc-600 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 10, delay: 2, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400 font-mono">
              <span>0:00</span>
              <span>3:47</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide07_LanyEra;
