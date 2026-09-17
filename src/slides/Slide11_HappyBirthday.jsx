import React from 'react';
import { motion } from 'framer-motion';
import { contentConfig } from '../config/contentConfig';

const Slide11_HappyBirthday = () => {
  const bestPortrait = contentConfig.photos.slide11[0];

  return (
    <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
      
      {/* Portrait Photo */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img src={bestPortrait} alt="Birthday Portrait" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </motion.div>

      {/* Elegant Typography */}
      <div className="relative z-20 text-center flex flex-col items-center justify-center h-full px-4 sm:px-6 my-auto">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-3xl min-[380px]:text-4xl sm:text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-4 sm:mb-6 drop-shadow-2xl whitespace-pre-line"
        >
          {contentConfig.texts.slide11.greeting}
          <span className="text-[var(--color-wrap-yellow)]">{contentConfig.texts.slide11.name}</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3 }}
          className="text-sm min-[380px]:text-base sm:text-xl md:text-2xl font-medium text-white/90 max-w-xl mx-auto drop-shadow-lg leading-relaxed"
        >
          {contentConfig.texts.slide11.message}
        </motion.p>
      </div>
    </div>
  );
};

export default Slide11_HappyBirthday;
