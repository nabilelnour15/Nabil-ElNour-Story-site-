
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const AdvancedCursor: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest('button, a, .interactive'));
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ 
        x: cursorX, 
        y: cursorY, 
        translateX: '-50%', 
        translateY: '-50%',
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
        border: isHovered ? 'none' : '1px solid rgba(59, 130, 246, 0.5)'
      }}
      className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center backdrop-blur-[2px]"
    >
      <motion.div animate={{ scale: isHovered ? 0 : 1 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
    </motion.div>
  );
};
