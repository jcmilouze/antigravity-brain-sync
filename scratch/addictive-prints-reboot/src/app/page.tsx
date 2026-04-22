'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Hero3D = dynamic(() => import('@/components/Hero3D').then(m => ({ default: m.Hero3D })), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-[#1A1A2E]" />,
});

const FeaturedProducts = dynamic(() => import('@/components/FeaturedProducts').then(m => ({ default: m.FeaturedProducts })), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-[#1A1A2E]" />,
});

const Configurator3D = dynamic(() => import('@/components/Configurator3D').then(m => ({ default: m.Configurator3D })), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-[#1A1A2E]" />,
});

export default function Home() {
  return (
    <main className="bg-[#1A1A2E]">
      <Suspense fallback={<div className="w-full h-screen bg-[#1A1A2E]" />}>
        <Hero3D />
      </Suspense>
      <Suspense fallback={<div className="w-full h-64 bg-[#1A1A2E]" />}>
        <FeaturedProducts />
      </Suspense>
      <Suspense fallback={<div className="w-full h-96 bg-[#1A1A2E]" />}>
        <Configurator3D />
      </Suspense>

      <footer className="section border-t border-[rgba(124,58,237,0.2)] text-center py-12">
        <p className="text-[#A0A0B0] text-sm font-mono tracking-widest">
          © 2026 ADDICTIVE PRINTS // Où l'artisanat rencontre la technologie
        </p>
      </footer>
    </main>
  );
}
