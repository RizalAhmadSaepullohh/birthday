import React from 'react';
import { motion } from 'framer-motion';
import { contentConfig } from '../config/contentConfig';

const Slide08_PhotoMontage = () => {
  const gridImages = contentConfig.photos.slide08;

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Fast Paced Grid */}
      <div className="absolute inset-0 grid grid-cols-5 md:grid-cols-8 gap-2 p-2 opacity-40 mix-blend-screen overflow-hidden">
        {gridImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.2 + (i * 0.1),
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2 + Math.random()
            }}
            className="w-full h-24 md:h-32 overflow-hidden rounded-md"
          >
            <img src={src} alt="Montage" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all" />
          </motion.div>
        ))}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 my-auto flex flex-col items-center justify-center max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-3xl min-[380px]:text-4xl sm:text-5xl md:text-7xl font-black text-white text-stroke tracking-tighter mb-4 sm:mb-6 leading-tight"
        >
          Several Photos Later...
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.5, type: 'spring' }}
          className="bg-[var(--color-wrap-pink)] text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-full shadow-2xl transform rotate-[-2deg] sm:rotate-[-3deg]"
        >
          <p className="text-sm min-[380px]:text-base sm:text-2xl md:text-4xl font-black uppercase tracking-tight">
            Everything looks so pretty and cute.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide08_PhotoMontage;
