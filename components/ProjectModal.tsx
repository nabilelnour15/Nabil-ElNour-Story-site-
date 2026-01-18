
import React from 'react';
import { motion } from 'framer-motion';
import { X, Globe, Github, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-12 overflow-y-auto bg-black/90 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ y: 100, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-6xl bg-zinc-950 rounded-[2rem] md:rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 md:top-12 md:right-12 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[40vh] lg:h-auto overflow-hidden bg-zinc-900">
             <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60" />
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
             <div className="absolute bottom-12 left-12">
                <span className="text-blue-500 font-black tracking-widest text-xs uppercase mb-4 block">Case Study // {project.id}</span>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">{project.title}</h2>
             </div>
          </div>

          <div className="p-8 md:p-16 lg:p-24 space-y-12">
             <div className="space-y-4">
                <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em]">The Challenge</p>
                <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light">{project.problem}</p>
             </div>

             <div className="space-y-4">
                <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em]">The Solution</p>
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">{project.outcome}</p>
             </div>

             <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div className="space-y-4">
                   <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Core Tech</p>
                   <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-zinc-900 text-zinc-400 text-[10px] font-bold rounded-md border border-white/5">{t}</span>
                      ))}
                   </div>
                </div>
                <div className="space-y-4">
                   <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Primary Focus</p>
                   <div className="flex flex-wrap gap-2">
                      {project.focus.map(f => (
                        <span key={f} className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black rounded-md uppercase tracking-tighter">
                          <CheckCircle2 size={10} /> {f}
                        </span>
                      ))}
                   </div>
                </div>
             </div>

             <div className="pt-12 flex flex-col md:flex-row gap-6">
                <button className="flex-1 bg-white text-black py-5 px-8 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-3">
                   Launch Project <Globe size={20} />
                </button>
                <button className="flex-1 border border-zinc-800 py-5 px-8 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-900 transition-colors flex items-center justify-center gap-3">
                   Github Repo <Github size={20} />
                </button>
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
