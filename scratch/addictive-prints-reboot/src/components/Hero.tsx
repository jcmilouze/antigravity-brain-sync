"use client";

import { motion } from "framer-motion";
import ProductCanvas from "./ProductCanvas";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col md:flex-row items-center justify-between overflow-hidden border-b border-zinc-900 bg-zinc-950">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      {/* Text Side */}
      <div className="relative z-10 flex-1 section-padding flex flex-col justify-center gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-3 py-1 mb-6 text-xs font-mono uppercase tracking-widest bg-zinc-900 border border-zinc-800 rounded-full text-accent">
            // Addictive Prints v2.0
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-6">
            INDUSTRIAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-zinc-400">
              PRECISION.
            </span>
          </h1>
          <p className="text-zinc-400 max-w-md text-lg leading-relaxed">
            Accessoires ultra-robustes imprimés en 3D. Pensés par des artisans, pour des artisans exigeants.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <button className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform active:scale-95">
            DÉCOUVRIR LE CATALOGUE <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 glass text-zinc-50 font-bold rounded-xl hover:bg-white/5 transition-colors">
            À PROPOS
          </button>
        </motion.div>
        
        {/* Technical Stats */}
        <motion.div 
          className="mt-12 grid grid-cols-2 gap-8 border-t border-zinc-900 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div>
            <div className="font-mono text-accent text-sm mb-1">PRECISION_RATE</div>
            <div className="text-2xl font-bold">0.12 MM</div>
          </div>
          <div>
            <div className="font-mono text-accent text-sm mb-1">DURABILITY_SCORE</div>
            <div className="text-2xl font-bold">MAX_9.8</div>
          </div>
        </motion.div>
      </div>

      {/* 3D Side */}
      <div className="relative flex-1 w-full h-[50vh] md:h-full border-l border-zinc-900 bg-zinc-900/20">
        <ProductCanvas />
        
        {/* Overlay Labels */}
        <div className="absolute bottom-8 right-8 text-right font-mono text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
          Interactive_Viewer // [V1_CALE_R3F]
        </div>
      </div>
    </section>
  );
}
