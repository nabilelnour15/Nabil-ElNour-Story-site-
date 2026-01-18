
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  idx: number;
  onClick: (p: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, idx, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [8, -8]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-250, 250], [-8, 8]), { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-10%" }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className={`relative flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group mb-40 cursor-pointer interactive`}
    >
      <div className="w-full lg:w-3/5 relative overflow-visible">
          <div className="absolute -inset-10 bg-blue-500/10 blur-[120px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
          
          <div className="relative aspect-video overflow-hidden rounded-[2rem] md:rounded-[4rem] border border-white/5 bg-zinc-900 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <motion.img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-12">
                  <div className="flex gap-4 items-center mb-4">
                     {project.tech.slice(0, 3).map((t) => (
                       <span key={t} className="text-[10px] uppercase font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full backdrop-blur-md border border-blue-500/20">{t}</span>
                     ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase">Process Reveal Available</p>
                    <Maximize2 size={20} className="text-white" />
                  </div>
              </div>
          </div>
      </div>

      <div className="w-full lg:w-2/5 px-4 md:px-0">
        <div className="mb-4 flex items-center gap-4">
           <span className="text-blue-500 font-black text-xl italic leading-none">{project.id}</span>
           <div className="h-px flex-1 bg-white/5 group-hover:bg-blue-500/30 transition-colors" />
        </div>
        
        <h4 className="text-5xl md:text-7xl font-black mb-8 group-hover:text-blue-500 transition-all duration-500 leading-none tracking-tighter">
          {project.title}
        </h4>
        
        <div className="space-y-8 border-l-2 border-zinc-800 pl-8 group-hover:border-blue-500 transition-all duration-500">
          <div>
            <p className="text-zinc-600 text-[10px] uppercase tracking-[0.5em] mb-3 font-black">Challenge</p>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light">{project.problem}</p>
          </div>
          <motion.button 
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-blue-500 font-black text-sm uppercase tracking-widest"
          >
             Case Study <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
