'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { CategoriesBento } from '@/components/CategoriesBento';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Footer } from '@/components/Footer';

const Configurator3DDynamic = dynamic(() => import('@/components/Configurator3D').then(m => ({ default: m.Configurator3D })), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-surface-container" />,
});

export default function Home() {
  return (
    <main className="bg-background">
      <Suspense fallback={<div className="w-full h-screen bg-surface-container" />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<div className="w-full py-20 bg-surface-container" />}>
        <CategoriesBento />
      </Suspense>

      <Suspense fallback={<div className="w-full h-64 bg-surface-container" />}>
        <FeaturedProducts />
      </Suspense>

      <Suspense fallback={<div className="w-full h-96 bg-surface-container" />}>
        <Configurator3DDynamic />
      </Suspense>

      <Footer />
    </main>
  );
}
