import React from 'react';
import { motion } from 'framer-motion';

const Navigation = ({ currentSlide, totalSlides, onNext, onPrev }) => {
  // Start from slide 1 (slide 0 is intro/start button)
  const isStarted = currentSlide > 0;

  if (!isStarted) return null;

  return (
    <div className="absolute inset-0 z-50 pointer-events-none flex flex-col">
      {/* Progress Bars */}
      <div className="w-full px-2 pt-4 pb-2 flex gap-1 bg-gradient-to-b from-black/40 to-transparent">
        {Array.from({ length: totalSlides - 1 }).map((_, i) => {
          const slideIndex = i + 1;
          const isCompleted = currentSlide > slideIndex;
          const isActive = currentSlide === slideIndex;
          
          return (
            <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div 
                className="h-full bg-white origin-left"
                initial={{ scaleX: isCompleted ? 1 : 0 }}
                animate={{ scaleX: isCompleted ? 1 : (isActive ? 1 : 0) }}
                transition={isActive ? { duration: 8, ease: "linear" } : { duration: 0.2 }}
                style={{ width: '100%' }}
                onAnimationComplete={() => {
                  if (isActive && onNext) {
                    // Auto-advance optionally (disabled for manual control by default)
                    // onNext();
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Tap Zones - Only on edges so center interactions work */}
      <div 
        className="absolute top-12 bottom-0 left-0 w-1/4 max-w-24 pointer-events-auto cursor-pointer" 
        onClick={onPrev}
        aria-label="Previous Slide"
        role="button"
        tabIndex={0}
      />
      <div 
        className="absolute top-12 bottom-0 right-0 w-1/4 max-w-24 pointer-events-auto cursor-pointer" 
        onClick={onNext}
        aria-label="Next Slide"
        role="button"
        tabIndex={0}
      />
    </div>
  );
};

export default Navigation;
