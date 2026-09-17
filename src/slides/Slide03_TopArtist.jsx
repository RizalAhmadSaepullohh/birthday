import React from 'react';
import { motion } from 'framer-motion';
import { contentConfig } from '../config/contentConfig';

const Slide03_TopArtist = () => {
  const { title, items } = contentConfig.texts.slide03;
  const photos = contentConfig.photos.slide03;

  // Split into two columns
  const leftCol = items.slice(0, 5);
  const rightCol = items.slice(5, 10);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="w-full h-full bg-[#121212] flex flex-col items-center justify-center px-3 py-6 sm:p-6 md:p-8 relative overflow-hidden text-white font-sans">
      
      {/* Background Graphic elements matching Spotify green, white, and grey mix */}
      <div className="absolute top-0 left-0 w-full h-[35%] bg-[#1DB954] skew-y-[-4deg] origin-top-left z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Large abstract text in background */}
        <div className="absolute top-[-20%] left-[-10%] text-[20rem] font-black text-black/10 leading-none tracking-tighter mix-blend-overlay">
          2026
        </div>
        {/* White and grey circle patterns */}
        <div className="absolute top-10 right-[10%] flex gap-4">
          <div className="w-12 h-12 rounded-full bg-white"></div>
          <div className="w-8 h-8 rounded-full bg-gray-300 self-end"></div>
        </div>
        <div className="absolute bottom-[-20px] left-[20%] w-24 h-24 rounded-full bg-gray-400 mix-blend-screen opacity-50"></div>
      </div>

      {/* Main Content Centered Wrapper */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-xl md:max-w-4xl mx-auto flex flex-col items-center justify-center my-auto">
        {/* Title */}
        <div className="mb-4 sm:mb-6 flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            className="bg-white text-black px-4 sm:px-8 py-1.5 sm:py-2.5 shadow-2xl transform -rotate-1"
          >
            <h2 className="text-2xl min-[380px]:text-3xl md:text-5xl font-black uppercase tracking-tighter text-center whitespace-pre-line leading-none">
              {title}
            </h2>
          </motion.div>
        </div>

        {/* Top 10 List Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-x-2 min-[380px]:gap-x-4 sm:gap-x-8 md:gap-x-12 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
            {leftCol.map((item, index) => (
              <motion.div key={`left-${index}`} variants={itemVariants} className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-lg min-[380px]:text-xl sm:text-2xl md:text-3xl font-black w-4 min-[380px]:w-5 sm:w-7 text-right text-gray-300">{index + 1}</span>
                <div className="w-9 h-9 min-[380px]:w-11 min-[380px]:h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 border-[1px] border-gray-600 overflow-hidden shadow-md rounded-sm">
                  <img src={photos[index]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] min-[380px]:text-xs sm:text-sm md:text-base font-bold leading-tight flex-1 text-gray-100 line-clamp-2">{item.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
            {rightCol.map((item, index) => (
              <motion.div key={`right-${index}`} variants={itemVariants} className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-lg min-[380px]:text-xl sm:text-2xl md:text-3xl font-black w-4 min-[380px]:w-5 sm:w-7 text-right text-gray-300">{index + 6}</span>
                <div className="w-9 h-9 min-[380px]:w-11 min-[380px]:h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 border-[1px] border-gray-600 overflow-hidden shadow-md rounded-sm">
                  <img src={photos[index + 5]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] min-[380px]:text-xs sm:text-sm md:text-base font-bold leading-tight flex-1 text-gray-100 line-clamp-2">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
    </div>
  );
};

export default Slide03_TopArtist;
