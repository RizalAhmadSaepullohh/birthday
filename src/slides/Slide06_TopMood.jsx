import React from 'react';
import { motion } from 'framer-motion';
import { contentConfig } from '../config/contentConfig';

const Slide06_TopMood = () => {
  return (
    <div className="w-full h-full bg-[var(--color-wrap-purple)] flex flex-col justify-center items-center px-4 py-8 sm:p-8 relative overflow-hidden">
      
      {/* Abstract background shapes */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[var(--color-wrap-pink)] rounded-full mix-blend-screen blur-3xl opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[var(--color-wrap-blue)] rounded-full mix-blend-screen blur-3xl opacity-50"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="z-10 text-center max-w-2xl mx-auto my-auto flex flex-col items-center justify-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg min-[380px]:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-8 uppercase tracking-wider"
        >
          {contentConfig.texts.slide06.title}
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1, type: 'spring', bounce: 0.5 }}
          className="text-3xl min-[380px]:text-4xl sm:text-6xl md:text-8xl font-black text-white text-stroke tracking-tighter leading-tight"
        >
          {contentConfig.texts.slide06.mood}
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-6 sm:mt-12 bg-white text-black px-6 py-2.5 sm:px-8 sm:py-4 rounded-full inline-flex items-center shadow-xl"
        >
          <span className="text-2xl sm:text-3xl font-black">{contentConfig.texts.slide06.statValue}</span>
          <span className="ml-2 text-sm sm:text-xl font-bold">{contentConfig.texts.slide06.statSubtext}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide06_TopMood;
