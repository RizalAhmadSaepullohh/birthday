import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { contentConfig } from '../config/contentConfig';

const Slide05_PhotoReveal = () => {
  const mainPhoto = contentConfig.photos.slide05[0];

  return (
    <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
      
      {/* Full screen photo with subtle zoom */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/70 z-10" />
        <img src={mainPhoto} alt="Main Character" className="w-full h-full object-cover opacity-75" />
      </motion.div>

      {/* Dramatic Typography Centered and Fitted */}
      <div className="relative z-20 text-center flex flex-col items-center justify-center h-full w-full px-4 sm:px-6 py-12">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-sm min-[380px]:text-base sm:text-lg md:text-xl font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[var(--color-wrap-yellow)] mb-3 drop-shadow"
        >
          FAVORITE PERSON
        </motion.p>
        
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-4xl min-[380px]:text-5xl sm:text-6xl md:text-8xl font-black text-white leading-none tracking-tighter drop-shadow-2xl"
        >
          UNFORGETABLE
          <br />
          HER
          <br />
          SMILE.
        </motion.h2>
      </div>
    </div>
  );
};

export default Slide05_PhotoReveal;
