'use client';

import { FEATURED_PRODUCTS } from '@/lib/mockData';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';

export function FeaturedProducts() {
  return (
    <section className="section">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] bg-clip-text text-transparent">
            Coup de Cœur
          </span>
        </h2>
        <p className="text-[#A0A0B0] text-lg">
          Nos produits les plus appréciés par les artisans exigeants
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURED_PRODUCTS.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}
