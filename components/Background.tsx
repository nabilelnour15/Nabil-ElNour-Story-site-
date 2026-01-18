
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Background: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.2]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.1]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-grid overflow-hidden">
      <motion.div 
        style={{ rotate, opacity: opacity1 }}
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-blue-600/5 blur-[120px] rounded-full"
      />
      <motion.div 
        style={{ opacity: opacity2 }}
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] bg-purple-600/5 blur-[150px] rounded-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
    </div>
  );
};
