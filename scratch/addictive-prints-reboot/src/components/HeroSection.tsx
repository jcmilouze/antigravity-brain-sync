'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

const PrinterScene = dynamic(
  () => import('@/components/3D/PrinterScene').then(m => ({ default: m.PrinterScene })),
  {
    ssr: false,
    loading: () => <div className="w-full h-[600px] bg-surface-container-highest" />,
  }
);

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative w-full bg-background bg-dot-pattern py-20 px-4">
      <div className="grid grid-cols-12 gap-8 max-w-6xl mx-auto">
        {/* Left Content */}
        <motion.div
          className="col-span-12 md:col-span-7 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-4"
            variants={itemVariants}
          >
            Précision Addictive
          </motion.h1>

          <motion.p
            className="text-lg text-on-surface-variant mb-8"
            variants={itemVariants}
          >
            Où l'artisanat rencontre la technologie
          </motion.p>

          <motion.button
            className="btn-primary w-fit"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explorer la Magie
          </motion.button>
        </motion.div>

        {/* Right 3D Canvas */}
        <div className="col-span-12 md:col-span-5">
          <Suspense fallback={<div className="w-full h-[600px] bg-surface-container-highest rounded-lg" />}>
            <div className="w-full h-[600px]">
              <PrinterScene />
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
