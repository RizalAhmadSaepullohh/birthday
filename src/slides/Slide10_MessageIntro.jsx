import React from 'react';
import { motion } from 'framer-motion';
import { contentConfig } from '../config/contentConfig';

const Slide10_MessageIntro = () => {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center px-4 py-8 sm:p-8 relative overflow-hidden">
      <div className="z-10 max-w-2xl text-center my-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="text-lg min-[380px]:text-xl sm:text-2xl md:text-4xl font-medium text-white/85 leading-relaxed"
        >
          {contentConfig.texts.slide10.line1}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 4 }}
          className="text-lg min-[380px]:text-xl sm:text-2xl md:text-4xl font-medium text-white/85 leading-relaxed mt-4 sm:mt-6"
        >
          {contentConfig.texts.slide10.line2}
        </motion.p>
      </div>
      
      {/* Subtle pulsing background light to transition to emotional part */}
      <motion.div
        className="absolute inset-0 bg-[var(--color-wrap-pink)] opacity-0 mix-blend-screen"
        animate={{ opacity: [0, 0.05, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default Slide10_MessageIntro;
