
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MoveDown, MoveRight, Palette, Code, Zap } from 'lucide-react';
import { PILLARS } from '../constants';

export const StickyMethodology: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  const x = useTransform(scrollYProgress, [0.2, 1], ["0%", "-66.6%"]);
  const verticalLineHeight = useTransform(scrollYProgress, [0, 0.2], ["0%", "100%"]);
  const horizontalLineWidth = useTransform(scrollYProgress, [0.2, 1], ["0%", "100%"]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.85, 1, 1, 0.9]);
  const rotateY = useTransform(scrollYProgress, [0.2, 1], [5, -5]);

  return (
    <div ref={targetRef} className="relative h-[500vh] w-full bg-[#030303]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute left-8 md:left-24 top-0 bottom-0 w-[1px] bg-zinc-800">
               <motion.div style={{ height: verticalLineHeight }} className="w-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
               <div className="absolute top-1/4 -left-4 -rotate-90 text-[10px] font-black tracking-widest text-zinc-600 flex items-center gap-4 whitespace-nowrap">
                  VERTICAL THINKING <MoveDown size={12} />
               </div>
            </div>
            <div className="absolute bottom-20 left-8 md:left-24 right-8 md:right-24 h-[1px] bg-zinc-800">
               <motion.div style={{ width: horizontalLineWidth }} className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
               <div className="absolute -bottom-6 left-0 text-[10px] font-black tracking-widest text-zinc-600 flex items-center gap-4">
                  HORIZONTAL EXECUTION <MoveRight size={12} />
               </div>
            </div>
        </div>

        <motion.div style={{ scale, rotateY, perspective: 1200 }} className="w-full">
            <div className="px-8 md:px-24 mb-16 relative z-10">
               <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex flex-col gap-2">
                 <span className="text-blue-500 font-black text-xs uppercase tracking-[0.4em]">Strategic Architecture</span>
                 <h3 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
                    Deep logic. <br/> <span className="text-zinc-800">Wide impact.</span>
                 </h3>
               </motion.div>
            </div>
            
            <motion.div style={{ x }} className="flex gap-8 md:gap-12 px-8 md:px-24">
              {PILLARS.map((pillar, idx) => {
                const IconMap: any = { Palette, Code, Zap };
                const Icon = IconMap[pillar.icon];
                return (
                  <div key={idx} className="w-[85vw] md:w-[45vw] flex-shrink-0">
                    <motion.div className="h-[55vh] p-8 md:p-12 glass rounded-[3rem] flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:border-blue-500/50">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10">
                        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-blue-500/20">
                          <Icon size={32} className="text-white" />
                        </motion.div>
                        <h4 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{pillar.title}</h4>
                        <p className="text-lg md:text-xl text-zinc-400 max-w-sm leading-relaxed font-light">{pillar.description}</p>
                      </div>
                      <div className="flex justify-between items-end relative z-10">
                         <div className="text-[8vw] font-black opacity-[0.05] leading-none select-none">0{idx + 1}</div>
                         <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest border border-zinc-800 px-4 py-2 rounded-full">Phase // {idx === 0 ? 'Foundation' : idx === 1 ? 'Architecture' : 'Deployment'}</div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
