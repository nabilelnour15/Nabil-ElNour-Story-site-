
import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  isHighlighted: boolean;
  index: number;
  progress: MotionValue<number>;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, isHighlighted, index, progress }) => {
  const yOffset = useTransform(progress, [0, 0.5, 1], [50, 0, -50]);
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const jitterX = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0, index % 2 === 0 ? 10 : -10, 0, index % 2 === 0 ? -15 : 15, 0]);
  const redX = useTransform(progress, [0, 1], [-8, 8]);
  const cyanX = useTransform(progress, [0, 1], [8, -8]);

  return (
    <motion.div style={{ y: yOffset, opacity, x: jitterX }} className="relative mb-4 md:mb-8">
      <h3 className={`text-4xl md:text-8xl font-black relative z-10 transition-colors duration-500 ${isHighlighted ? 'text-glow text-blue-500' : 'text-zinc-900'}`}>
        {text}
      </h3>
      <motion.h3 style={{ x: redX }} className="absolute inset-0 text-4xl md:text-8xl font-black text-red-600/20 z-0 pointer-events-none select-none blur-[1px]">{text}</motion.h3>
      <motion.h3 style={{ x: cyanX }} className="absolute inset-0 text-4xl md:text-8xl font-black text-cyan-400/20 z-0 pointer-events-none select-none blur-[1px]">{text}</motion.h3>
    </motion.div>
  );
};
