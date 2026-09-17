import React from 'react';
import { motion } from 'framer-motion';

const SlideContainer = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 w-full h-full flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
};

export default SlideContainer;
