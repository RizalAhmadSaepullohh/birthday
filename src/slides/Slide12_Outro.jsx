import React from 'react';
import { motion } from 'framer-motion';
import { contentConfig } from '../config/contentConfig';

const Slide12_Outro = () => {
  return (
    <div className="w-full h-full bg-black flex flex-col justify-center items-center px-4 py-8 sm:p-8 relative overflow-hidden">
      
      {/* Subtle fading gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-[var(--color-spotify-dark)] to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      />
      
      {/* Faint bokeh/light leak effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-wrap-yellow)] rounded-full mix-blend-screen blur-[100px] opacity-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center max-w-2xl my-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
        >
          {contentConfig.texts.slide12.line1}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="text-base min-[380px]:text-lg sm:text-2xl md:text-3xl text-gray-400 font-medium"
        >
          {contentConfig.texts.slide12.line2}
        </motion.p>
      </div>
      
      {/* Small Replay Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5 }}
        onClick={() => window.location.reload()}
        className="absolute bottom-8 sm:bottom-12 text-xs sm:text-sm uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
      >
        Replay Experience
      </motion.button>
    </div>
  );
};

export default Slide12_Outro;
