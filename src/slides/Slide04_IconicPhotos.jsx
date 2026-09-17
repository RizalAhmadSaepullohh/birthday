import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contentConfig } from '../config/contentConfig';

const Slide04_IconicPhotos = () => {
  const [cards, setCards] = useState(() => 
    contentConfig.photos.slide04.map((src, i) => ({
      id: i,
      instanceId: i, // Unique key for AnimatePresence
      src: src,
      rotation: (Math.random() - 0.5) * 10 // -5deg to 5deg
    }))
  );

  const [isHovered, setIsHovered] = useState(false);

  // Cycle the top card to the bottom
  const cycleCard = () => {
    setCards(prev => {
      const newCards = [...prev];
      const top = newCards.shift();
      // Generate a new instanceId to ensure it enters as a new element later if needed
      top.instanceId = Date.now() + Math.random();
      top.rotation = (Math.random() - 0.5) * 10;
      newCards.push(top);
      return newCards;
    });
  };

  useEffect(() => {
    let interval;
    if (isHovered) {
      // Cycle every 800ms while hovered (slightly longer than 650ms animation)
      interval = setInterval(cycleCard, 800);
      // Trigger first cycle immediately on hover
      cycleCard(); 
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const cardVariants = {
    initial: {
      opacity: 0,
      scale: 0.85,
      y: 20
    },
    animate: (idx) => ({
      opacity: idx < 4 ? 1 : 0,
      scale: 1 - (idx * 0.03),
      y: idx * 8, // slight vertical offset for depth
      zIndex: 4 - idx,
      rotate: cards[idx]?.rotation || 0,
    }),
    exit: {
      x: 150,
      y: -80,
      rotate: 15,
      opacity: 0,
      scale: 1.05,
      zIndex: 5
    }
  };

  return (
    <div className="w-full h-full bg-[var(--color-wrap-orange)] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      
      {/* Title */}
      <motion.div 
        className="z-20 text-center max-w-lg mx-auto mb-4 sm:mb-8 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white leading-tight uppercase text-stroke-black">
          {contentConfig.texts.slide04.title}
        </h2>
        <p className="text-xs sm:text-base md:text-xl font-bold mt-1 sm:mt-2 text-white/90 drop-shadow-md">
          {contentConfig.texts.slide04.subtitle}
        </p>
      </motion.div>

      {/* Interactive Photo Stack */}
      <div 
        className="relative w-52 h-72 sm:w-64 sm:h-96 md:w-80 md:h-[28rem] cursor-pointer touch-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (!isHovered) cycleCard();
        }}
      >
        <AnimatePresence mode="popLayout">
          {cards.slice(0, 5).map((card, idx) => (
            <motion.div
              key={card.instanceId}
              custom={idx}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white origin-center bg-white pointer-events-none"
            >
              <img 
                src={card.src} 
                alt="Memory" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Slide04_IconicPhotos;
