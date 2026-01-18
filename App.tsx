
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, ArrowRight, Terminal, Sparkles, FileText, Download } from 'lucide-react';
import { Scene } from './components/Scene';
import { Background } from './components/Background';
import { AdvancedCursor } from './components/AdvancedCursor';
import { GlitchText } from './components/GlitchText';
import { ProjectModal } from './components/ProjectModal';
import { ProjectCard } from './components/ProjectCard';
import { StickyMethodology } from './components/StickyMethodology';
import { HERO_HEADLINE, HERO_SUBHEADLINE, PROJECTS } from './constants';
import { Project } from './types';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const { scrollYProgress: bridgeScroll } = useScroll({ target: bridgeRef, offset: ["start end", "end start"] });
  const { scrollYProgress: problemScroll } = useScroll({ target: problemRef, offset: ["start end", "end start"] });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewX = useTransform(smoothVelocity, [-0.1, 0.1], [-5, 5]);
  const stretch = useTransform(smoothVelocity, [-0.1, 0.1], [0.8, 1.2]);

  const gridScale = useTransform(bridgeScroll, [0, 1], [1, 1.5]);
  const gridOpacity = useTransform(bridgeScroll, [0, 0.5, 1], [0.1, 0.4, 0.1]);
  const bridgeY = useTransform(bridgeScroll, [0, 1], [100, -100]);
  
  const problemBgOpacity = useTransform(problemScroll, [0, 0.5, 1], [0, 0.4, 0]);
  const problemBlur = useTransform(problemScroll, [0, 0.2, 0.5, 0.8, 1], [10, 2, 0, 2, 10]);
  const problemGridScale = useTransform(problemScroll, [0, 1], [1.2, 0.8]);
  const problemNoiseOpacity = useTransform(problemScroll, [0, 0.4, 0.6, 1], [0.05, 0.15, 0.15, 0.05]);

  return (
    <div ref={containerRef} className="relative w-full snap-container">
      <AdvancedCursor />
      <Background />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <div className="fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-50 mix-blend-difference hidden xl:flex flex-col gap-12 items-center">
         <div className="h-32 w-px bg-white/20 relative">
            <motion.div style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} className="w-full bg-blue-500" />
         </div>
         <span className="rotate-90 text-[8px] font-black uppercase tracking-[1em] text-white/40 whitespace-nowrap origin-left">Scroll Progress // System Active</span>
      </div>

      <Scene id="start" className="snap-section">
        <motion.div className="text-center">
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                <Terminal className="text-blue-500 mb-8" size={32} />
                <h2 className="text-2xl md:text-4xl font-light text-zinc-400 max-w-2xl leading-relaxed italic">"Every great interface is a bridge between a human and an idea."</h2>
                <div className="mt-20 w-px h-20 bg-gradient-to-b from-blue-500 to-transparent" />
             </motion.div>
        </motion.div>
      </Scene>

      <Scene id="hero" className="snap-section max-w-7xl mx-auto overflow-visible">
        <motion.div style={{ skewX, scale: stretch }} className="text-center lg:text-left">
           <div className="mb-6 flex items-center justify-center lg:justify-start gap-3">
              <Sparkles className="text-blue-500" size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">Creative Technologist</span>
           </div>
           <h1 className="text-5xl md:text-[9vw] font-black leading-[0.8] tracking-tighter mb-12 flex flex-wrap justify-center lg:justify-start">
             {HERO_HEADLINE.split(' ').map((word, i) => (
                <motion.span key={i} className="mr-6 inline-block hover:text-blue-500 transition-colors cursor-default" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>{word}</motion.span>
             ))}
           </h1>
           <p className="text-xl md:text-4xl text-zinc-500 mb-16 max-w-4xl leading-tight font-light">{HERO_SUBHEADLINE}</p>
           <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <a href="#projects" className="interactive px-12 py-6 bg-white text-black font-black rounded-full hover:scale-105 transition-transform flex items-center gap-4">The Proof <ArrowRight size={20} /></a>
              <a href="#contact" className="interactive px-12 py-6 border border-zinc-800 font-bold rounded-full hover:bg-zinc-900 transition-colors">Let's Build</a>
           </div>
        </motion.div>
      </Scene>

      <div ref={problemRef}>
        <Scene className="snap-section bg-[#020202] overflow-hidden">
          <motion.div style={{ opacity: problemBgOpacity }} className="absolute inset-0 pointer-events-none z-0">
             <motion.div style={{ scale: problemGridScale }} className="absolute inset-0 opacity-40">
                <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,0,0,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px', maskImage: 'radial-gradient(circle, black, transparent 70%)' }} />
                <motion.div animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.02, 1] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }} className="absolute inset-0 bg-red-900/5 mix-blend-overlay" />
             </motion.div>
             <motion.div style={{ opacity: problemNoiseOpacity }} className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-50" />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-1/4 animate-scanline" />
             <div className="grid grid-cols-12 h-full gap-1">
                {[...Array(24)].map((_, i) => (
                  <motion.div key={i} style={{ height: useTransform(problemScroll, [0, Math.random(), 1], ["0%", "100%", "0%"]) }} className="w-full bg-red-600/10 self-end" />
                ))}
             </div>
          </motion.div>
          <motion.div style={{ filter: useTransform(problemBlur, b => `blur(${b}px)`) }} className="max-w-5xl mx-auto relative z-10 text-center">
              {["Ideas are cheap.", "Visuals are static.", "Systems are chaotic.", "Users deserve better."].map((text, idx) => (
                <GlitchText key={idx} text={text} isHighlighted={idx === 3} index={idx} progress={problemScroll} />
              ))}
          </motion.div>
        </Scene>
      </div>

      <div ref={bridgeRef}>
        <Scene className="snap-section bg-blue-600 relative overflow-hidden">
           <motion.div style={{ scale: gridScale, opacity: gridOpacity }} className="absolute inset-0 z-0">
              <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`, backgroundSize: '80px 80px', maskImage: 'radial-gradient(circle, black, transparent 80%)' }} />
           </motion.div>
           <div className="text-center max-w-5xl mx-auto relative z-20">
              <motion.div style={{ y: bridgeY }}>
                <motion.h2 initial={{ scale: 1.4, opacity: 0, filter: 'blur(20px)' }} whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }} className="text-[18vw] font-black text-white leading-none mb-12 tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">BRIDGE.</motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-2xl md:text-5xl text-blue-100 font-light max-w-4xl mx-auto leading-tight">I convert abstract pixels into logical architectures. High performance isn't a feature; it's a foundation.</motion.p>
              </motion.div>
           </div>
        </Scene>
      </div>

      <StickyMethodology />

      <Scene id="projects" className="max-w-7xl mx-auto pt-40 pb-0">
        <div className="w-full">
          <div className="mb-40 px-4 md:px-0">
             <span className="text-blue-500 font-black tracking-[1em] uppercase text-xs mb-6 block">Case Studies</span>
             <h2 className="text-6xl md:text-[10vw] font-black leading-none tracking-tighter">Real Artifacts.</h2>
          </div>
          <div className="space-y-20">
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx} onClick={(p) => setSelectedProject(p)} />
            ))}
          </div>
        </div>
      </Scene>

      <Scene id="about" className="bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">
           {/* Visual Profile Side */}
           <div className="relative group px-4 md:px-0">
              <div className="absolute -inset-20 bg-blue-500/10 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Profile Image Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative glass aspect-[4/5] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl"
              >
                  {/* Image Placeholder - User should replace this URL with their actual image path */}
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                    alt="Nabil El-Nour" 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  />
                  
                  {/* Decorative Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                     <div>
                        <p className="text-blue-500 font-black text-[10px] uppercase tracking-[0.5em] mb-2">Subject Name</p>
                        <h4 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-none">NABIL EL-NOUR</h4>
                     </div>
                     <div className="text-right hidden md:block">
                        <div className="space-y-1 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                           <p>Loc: Alex // EG</p>
                           <p>Status: Active</p>
                        </div>
                     </div>
                  </div>
              </motion.div>
           </div>

           {/* Story Content Side */}
           <div className="space-y-12 px-4 md:px-0">
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
                <span className="text-blue-500 font-black tracking-[1em] uppercase text-[10px] mb-6 block">Biography</span>
                <h2 className="text-5xl md:text-8xl font-black leading-none tracking-tighter mb-10">Designing the <br/><span className="text-zinc-700">Logic.</span></h2>
              </motion.div>
              
              <div className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed space-y-8">
                <p>
                  I live at the intersection of aesthetic design and robust engineering. 
                  With a dual identity as a <strong>Full-Stack Developer</strong> and <strong>Motion Graphics Designer</strong>, 
                  I don’t just write code; I orchestrate experiences that are as visually moving as they are logically sound.
                </p>
                <p>
                  My journey from creating high-fidelity motion strategy at Blacktent to architecting complex 
                  logistics dashboards at Sphinx Publishing has taught me one core truth: 
                  <strong> Performance isn't just about speed; it's about the confidence a user feels in every interaction.</strong>
                </p>
              </div>

              {/* Stats/Meta Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-white/5">
                <div>
                  <p className="text-zinc-600 font-black text-[10px] uppercase tracking-widest mb-2">Philosophy</p>
                  <p className="text-white font-bold">Vertical Thinking</p>
                </div>
                <div>
                  <p className="text-zinc-600 font-black text-[10px] uppercase tracking-widest mb-2">Key Stack</p>
                  <p className="text-white font-bold">React & TS</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-zinc-600 font-black text-[10px] uppercase tracking-widest mb-2">Core Tools</p>
                  <p className="text-white font-bold">Node // AE</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-8 pt-4">
                 <a href="https://linkedin.com" target="_blank" className="interactive w-14 h-14 md:w-16 md:h-16 glass rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <Linkedin size={24} />
                 </a>
                 <a href="https://github.com" target="_blank" className="interactive w-14 h-14 md:w-16 md:h-16 glass rounded-2xl flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                    <Github size={24} />
                 </a>
                 <button className="interactive group px-8 md:px-10 h-14 md:h-16 glass rounded-2xl font-black uppercase tracking-widest hover:border-white transition-all flex items-center gap-4 text-xs md:text-base">
                    Resume <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                 </button>
              </div>
           </div>
        </div>
      </Scene>

      <Scene id="contact" className="snap-section bg-white text-black min-h-screen">
         <div className="text-center w-full px-4">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
               <h2 className="text-6xl md:text-[12vw] font-black leading-[0.8] tracking-tighter mb-20 uppercase">MAKE IT<br/><span className="text-blue-600">UNFORGETTABLE.</span></h2>
               <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                  <a href="mailto:nabil-elnour@hotmail.com" className="interactive text-3xl md:text-6xl font-black flex items-center gap-6 group">Email Me <ArrowRight size={48} className="group-hover:translate-x-6 transition-transform" /></a>
               </div>
            </motion.div>
         </div>
      </Scene>

      <footer className="py-20 px-8 md:px-12 border-t border-zinc-900 bg-black text-center">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 font-black uppercase tracking-[1em] text-[10px]">
            <p>© 2024 Nabil El-Nour</p>
            <p>From Idea to Experience</p>
            <p>Alexandria // Egypt</p>
         </div>
      </footer>
    </div>
  );
};

export default App;
