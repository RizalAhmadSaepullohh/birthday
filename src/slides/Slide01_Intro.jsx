import React from 'react';
import { motion } from 'framer-motion';
import { contentConfig } from '../config/contentConfig';

const Slide01_Intro = ({ onStart }) => {
  return (
    <div className="w-full h-full bg-[var(--color-wrap-pink)] flex flex-col items-center justify-center px-4 py-8 sm:p-6 text-center">
      {/* Animated gradient background overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-[var(--color-wrap-purple)] to-transparent opacity-80 mix-blend-overlay"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center my-auto">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          className="text-4xl min-[380px]:text-5xl sm:text-6xl md:text-8xl font-black text-white mb-2 sm:mb-4 text-stroke tracking-tighter whitespace-pre-line leading-none"
        >
          {contentConfig.texts.slide01.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-base min-[380px]:text-lg sm:text-xl md:text-2xl font-bold text-white/90 mb-8 sm:mb-12"
        >
          {contentConfig.texts.slide01.subtitle}
        </motion.p>
        
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5, type: 'spring', bounce: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-white text-black font-bold px-8 py-3 sm:px-10 sm:py-4 rounded-full text-lg sm:text-xl shadow-lg uppercase tracking-widest hover:bg-[var(--color-wrap-yellow)] transition-colors"
        >
          Start
        </motion.button>
      </div>
    </div>
  );
};

export default Slide01_Intro;
