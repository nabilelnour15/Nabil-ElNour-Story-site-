
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Mail, Linkedin, Github, ChevronDown, ArrowRight, ExternalLink, Palette, Code, Zap, Monitor, Layers, MousePointer2 } from 'lucide-react';
import { Scene } from './components/Scene';
import { Background } from './components/Background';
import { HERO_HEADLINE, HERO_SUBHEADLINE, PILLARS, PROJECTS, EXPERIENCES } from './constants';

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cursorX = useSpring(mousePos.x, { damping: 20, stiffness: 100 });
  const cursorY = useSpring(mousePos.y, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div
      style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500/50 pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference"
    >
      <div className="w-1 h-1 bg-blue-500 rounded-full" />
    </motion.div>
  );
};

const StickyPillars = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <div ref={targetRef} className="relative h-[300vh] w-full bg-[#080808]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="px-12 mb-12 absolute top-20 left-0 z-10">
           <h3 className="text-zinc-600 uppercase tracking-[0.5em] text-xs font-bold mb-2">My Methodology</h3>
           <p className="text-xl font-light text-zinc-400">Vertical thinking, horizontal execution.</p>
        </div>
        
        <motion.div style={{ x }} className="flex gap-20 px-12 md:px-24">
          {PILLARS.map((pillar, idx) => {
            const IconMap: any = { Palette, Code, Zap };
            const Icon = IconMap[pillar.icon];
            return (
              <div key={idx} className="w-[85vw] md:w-[45vw] flex-shrink-0">
                <div className="h-[60vh] p-12 bg-zinc-900/40 border border-zinc-800 rounded-[40px] flex flex-col justify-end relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon size={240} />
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-500/20">
                      <Icon size={32} className="text-white" />
                    </div>
                    <h4 className="text-4xl md:text-5xl font-bold mb-6">{pillar.title}</h4>
                    <p className="text-xl text-zinc-400 max-w-md leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
        
        {/* Progress Bar for the sticky section */}
        <div className="absolute bottom-10 left-12 right-12 h-[1px] bg-zinc-800">
           <motion.div style={{ scaleX: scrollYProgress, transformOrigin: "0%" }} className="h-full bg-blue-500 w-full" />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div ref={containerRef} className="relative w-full snap-container">
      <Cursor />
      <Background />

      {/* Progress Track (Sidebar) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50 mix-blend-difference hidden md:flex">
         {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div 
               key={i} 
               className="w-1 h-8 bg-zinc-800 rounded-full overflow-hidden"
               initial={false}
            >
               <motion.div 
                  className="w-full h-full bg-blue-500"
                  style={{ scaleY: useTransform(scrollYProgress, [i*0.16, (i+1)*0.16], [0, 1]), transformOrigin: "top" }}
               />
            </motion.div>
         ))}
      </div>

      {/* SCENE 0 - Entry Point */}
      <Scene id="start" className="snap-section">
        <motion.div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
             <div className="w-px h-24 bg-gradient-to-b from-transparent to-blue-500 mb-8" />
             <p className="text-zinc-500 tracking-[0.5em] uppercase mb-4 text-xs font-bold">Introduction</p>
             <h2 className="text-3xl md:text-5xl font-light text-zinc-300 italic max-w-3xl leading-snug">
               "Every great product begins as a single, quiet thought."
             </h2>
             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="mt-24 flex flex-col items-center gap-2 opacity-50"
             >
               <span className="text-[10px] uppercase tracking-[0.3em]">Vertical Scroll</span>
               <ChevronDown size={16} />
             </motion.div>
          </motion.div>
        </motion.div>
      </Scene>

      {/* SCENE 1 - Hero */}
      <Scene id="hero" className="snap-section max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-10">
                {HERO_HEADLINE.split(' ').map((word, i) => (
                  <motion.span 
                    key={i} 
                    className="inline-block mr-4"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <p className="text-xl md:text-3xl text-zinc-400 mb-12 max-w-3xl leading-relaxed font-light">
                {HERO_SUBHEADLINE}
              </p>
              <div className="flex flex-wrap gap-6">
                <a href="#projects" className="px-10 py-5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-2xl shadow-blue-600/20">
                  Explore Journey <ArrowRight size={20} />
                </a>
                <a href="mailto:nabil-elnour@hotmail.com" className="px-10 py-5 border border-zinc-700 font-bold rounded-full hover:bg-white hover:text-black transition-all">
                  Get in touch
                </a>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
             <div className="relative group">
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                   className="absolute -inset-10 border border-blue-500/10 rounded-full"
                />
                <div className="relative aspect-square rounded-[60px] bg-zinc-900 border border-zinc-800 p-12 flex flex-col justify-between overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <Code size={40} className="text-blue-500 mb-8" />
                   <div className="space-y-4 font-mono text-xs text-zinc-500">
                      <div className="flex justify-between"><span>NAME</span><span className="text-zinc-300">NABIL_HUSSIEN</span></div>
                      <div className="flex justify-between"><span>ORIGIN</span><span className="text-zinc-300">ALEXANDRIA_EG</span></div>
                      <div className="flex justify-between"><span>STACK</span><span className="text-zinc-300">MERN_TS_AE</span></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </Scene>

      {/* SCENE 2 - Problem Space */}
      <Scene className="snap-section bg-[#080808] overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="space-y-12 md:space-y-20">
            {["Ideas often stay visual.", "Designs look good — but don't always work.", "Systems become complex.", "Users feel it."].map((text, idx) => (
              <motion.p 
                key={idx}
                initial={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 1, delay: idx * 0.4 }}
                className={`text-4xl md:text-7xl font-bold ${idx === 3 ? 'text-red-500' : 'text-zinc-800'}`}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
        
        {/* Visual "Debris" Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           {[...Array(6)].map((_, i) => (
              <motion.div
                 key={i}
                 initial={{ x: Math.random() * 100 + "%", y: "110%" }}
                 animate={{ y: "-10%", rotate: Math.random() * 360 }}
                 transition={{ duration: Math.random() * 20 + 20, repeat: Infinity, ease: "linear" }}
                 className="absolute text-zinc-500 font-mono text-[10px] whitespace-nowrap"
              >
                 {`<div> fragmentation_error: 0x${Math.random().toString(16).slice(2, 6)} </div>`}
              </motion.div>
           ))}
        </div>
      </Scene>

      {/* SCENE 3 - Transformation */}
      <Scene className="snap-section bg-blue-600">
        <div className="text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-9xl font-black mb-8 text-white leading-none">
              The bridge.
            </h2>
            <p className="text-2xl md:text-4xl text-blue-100 leading-tight font-light max-w-3xl mx-auto">
              I translate visual concepts into real, usable systems where design, logic, and performance move in unison.
            </p>
            <div className="mt-16 flex justify-center gap-8">
               <div className="flex flex-col items-center">
                  <Monitor className="mb-2" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Visual</span>
               </div>
               <div className="w-12 h-px bg-blue-400 mt-6" />
               <div className="flex flex-col items-center">
                  <Layers className="mb-2" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Logic</span>
               </div>
            </div>
          </motion.div>
        </div>
      </Scene>

      {/* SCENE 4 - The 3 Pillars (Sticky) */}
      <StickyPillars />

      {/* SCENE 5 - Projects */}
      <Scene id="projects" className="max-w-7xl mx-auto">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
                <h2 className="text-5xl md:text-8xl font-black mb-6">Proof.</h2>
                <p className="text-zinc-500 text-xl leading-relaxed">Evidence of visual thinking becoming technical reality.</p>
            </div>
          </div>

          <div className="space-y-40">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-20%" }}
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
              >
                <div className="w-full lg:w-3/5 group relative">
                    <div className="absolute -inset-4 bg-blue-600/20 blur-2xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative aspect-video overflow-hidden rounded-[40px] border border-zinc-800 bg-zinc-900 shadow-2xl">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                        />
                    </div>
                </div>
                <div className="w-full lg:w-2/5">
                  <div className="flex items-center gap-4 mb-8">
                     <span className="text-blue-500 font-mono text-xl font-bold">{project.id}</span>
                     <div className="h-px w-12 bg-zinc-800" />
                  </div>
                  <h4 className="text-4xl md:text-5xl font-bold mb-8">{project.title}</h4>
                  
                  <div className="space-y-10">
                    <div>
                        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] mb-3 font-black">Challenge</p>
                        <p className="text-zinc-300 text-lg leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] mb-3 font-black">Outcome</p>
                        <p className="text-zinc-300 text-lg leading-relaxed italic border-l-2 border-blue-600 pl-6">{project.outcome}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4">
                        {project.tech.map(t => (
                            <span key={t} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-500 hover:text-white hover:border-zinc-500 transition-colors">{t}</span>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Scene>

      {/* SCENE 7 - About */}
      <Scene id="about" className="bg-[#080808]">
        <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative">
                    <div className="aspect-[4/5] bg-zinc-900 rounded-[60px] border border-zinc-800 flex items-center justify-center overflow-hidden group">
                        <motion.div 
                            animate={{ 
                                borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 20% 80% / 20% 50% 50% 80%", "30% 70% 70% 30% / 30% 30% 70% 70%"] 
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[80%] h-[80%] bg-gradient-to-br from-blue-600 to-indigo-900 opacity-20 blur-3xl group-hover:opacity-40 transition-opacity"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                             <h4 className="text-6xl font-black mb-4 tracking-tighter">Nabil.</h4>
                             <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase mb-12">Human / Developer / Designer</p>
                             <div className="grid grid-cols-2 gap-4 w-full text-center">
                                <div className="p-6 bg-zinc-950/50 rounded-3xl border border-zinc-800">
                                    <span className="block text-2xl font-bold mb-1">5+</span>
                                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Years Exp</span>
                                </div>
                                <div className="p-6 bg-zinc-950/50 rounded-3xl border border-zinc-800">
                                    <span className="block text-2xl font-bold mb-1">20+</span>
                                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Brands</span>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-5xl md:text-7xl font-bold mb-10">The human behind the systems.</h2>
                    <div className="space-y-8 text-zinc-400 text-xl leading-relaxed font-light">
                        <p>
                            I’m a creative fullstack developer who enjoys building things that feel good to use — visually and logically. My background in Geography and GIS gives me a structural way of looking at data that most developers miss.
                        </p>
                        <p>
                            I believe the best products aren't just "functional" or "pretty"—they are **coherent**. Every pixel should have a reason, and every function should have a soul.
                        </p>
                    </div>
                    
                    <div className="mt-16 flex flex-wrap gap-4">
                        <div className="flex gap-4">
                           <a href="#" className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all text-white">
                              <Linkedin size={24} />
                           </a>
                           <a href="#" className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-all text-white">
                              <Github size={24} />
                           </a>
                           <a href="mailto:nabil-elnour@hotmail.com" className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                              <Mail size={24} />
                           </a>
                        </div>
                        <button className="px-8 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl font-bold hover:bg-zinc-800 transition-all">
                           Download CV
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </Scene>

      {/* SCENE 9 - Final Frame (CTA) */}
      <Scene id="contact" className="snap-section bg-white text-black text-center min-h-[80vh]">
        <div className="max-w-5xl mx-auto py-20 px-6">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl md:text-[10vw] font-black mb-12 tracking-tighter leading-[0.8]">
              Let's make it real.
            </h2>
            <p className="text-2xl md:text-4xl mb-20 text-zinc-500 max-w-4xl mx-auto font-light leading-tight">
              I'm currently open to new collaborations and challenging systems.
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                <a href="mailto:nabil-elnour@hotmail.com" className="group text-4xl md:text-6xl font-bold hover:text-blue-600 transition-colors flex items-center gap-6">
                    Start a project <ArrowRight className="group-hover:translate-x-4 transition-transform" size={48} />
                </a>
            </div>
          </motion.div>
        </div>
      </Scene>

      <footer className="py-20 px-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-600 text-[10px] uppercase tracking-[0.5em] font-bold">
        <div>© 2024 Nabil Hussien</div>
        <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
        <div>Built with logic and soul.</div>
      </footer>
    </div>
  );
};

export default App;
