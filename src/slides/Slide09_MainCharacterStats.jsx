import React from 'react';
import { motion } from 'framer-motion';
import { contentConfig } from '../config/contentConfig';

const Slide09_MainCharacterStats = () => {
  const stats = contentConfig.texts.slide09.stats;

  return (
    <div className="w-full h-full bg-[var(--color-wrap-yellow)] flex flex-col items-center justify-center px-6 py-8 sm:p-8 relative overflow-hidden">
      
      <div className="z-10 w-full max-w-sm sm:max-w-xl md:max-w-4xl mx-auto my-auto flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl min-[380px]:text-4xl sm:text-5xl md:text-7xl font-black text-black leading-none mb-6 sm:mb-10 uppercase tracking-tighter whitespace-pre-line"
        >
          {contentConfig.texts.slide09.title}
        </motion.h2>

        <div className="grid grid-cols-2 gap-x-4 min-[380px]:gap-x-6 sm:gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + (i * 0.2) }}
              className="flex flex-col justify-start"
            >
              <span className={`font-black text-black tracking-tighter leading-none mb-1 sm:mb-2 ${
                stat.value.length > 4 
                  ? 'text-3xl min-[380px]:text-4xl sm:text-5xl md:text-7xl' 
                  : 'text-4xl min-[380px]:text-5xl sm:text-6xl md:text-8xl'
              }`}>
                {stat.value}
              </span>
              <span className="text-xs min-[380px]:text-sm sm:text-lg md:text-2xl font-bold text-black/70 uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide09_MainCharacterStats;
