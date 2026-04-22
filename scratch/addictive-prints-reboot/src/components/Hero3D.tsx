'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Suspense } from 'react';
import { PrinterScene } from './3D/PrinterScene';

export function Hero3D() {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-[#1A1A2E]" />}>
          <PrinterScene />
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(26,26,46,0.5)] z-10" />

      {/* Text Content */}
      <div className="relative z-20 text-center text-white px-6 max-w-2xl">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#FF006E] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Précision Addictive
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-[#A0A0B0] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Où l'artisanat rencontre la technologie
        </motion.p>

        <motion.button
          className="btn-primary text-base sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explorer la Magie de la Précision
        </motion.button>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} className="text-[#00D4FF]" />
      </motion.div>
    </section>
  );
}
