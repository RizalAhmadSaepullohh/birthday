import React from 'react';
import { motion } from 'framer-motion';
import { contentConfig } from '../config/contentConfig';

const Slide02_Soundtrack = () => {
  return (
    <div className="w-full h-full bg-[var(--color-wrap-blue)] flex flex-col items-center justify-center px-4 py-8 sm:p-8 overflow-hidden relative">
      
      {/* Background Graphic elements */}
      <motion.div 
        className="absolute w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] rounded-full border-[20px] border-white/10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] rounded-full border-[15px] border-white/20"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] rounded-full border-[10px] border-white/30"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
      />

      <div className="z-10 text-center max-w-2xl mx-auto my-auto flex flex-col items-center">
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight"
        >
          {contentConfig.texts.slide02.line1}
        </motion.p>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-xl sm:text-3xl md:text-4xl font-bold text-white mt-3 sm:mt-4"
        >
          {contentConfig.texts.slide02.line2}
        </motion.p>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 1, delay: 2.5 }}
          className="mt-8 sm:mt-12 bg-white text-black px-6 py-3 sm:px-8 sm:py-4 rounded-xl transform shadow-2xl rotate-2"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter">{contentConfig.texts.slide02.artist}</h2>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide02_Soundtrack;
