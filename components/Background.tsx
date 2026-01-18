
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Background: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-black overflow-hidden perspective-[1000px]">
      <motion.div 
        style={{ rotateX, y }}
        className="absolute inset-[-100%] bg-grid opacity-20"
      />
      
      {/* Floating Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-blue-600/10 blur-[150px] rounded-full"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -80, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-purple-600/10 blur-[150px] rounded-full"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  );
};
