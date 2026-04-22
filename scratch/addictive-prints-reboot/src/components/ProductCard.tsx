'use client';

import { Product } from '@/lib/types';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity: 1,
      selectedColor: product.colors[0].hex,
      selectedMaterial: product.materials[0].id,
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <motion.div
      className="card h-full flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-[rgba(0,212,255,0.1)] rounded-lg mb-4">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
        )}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.tags.map(tag => (
              <span
                key={tag}
                className="bg-[#FF006E] text-white text-xs font-semibold px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
        <p className="text-[#A0A0B0] text-sm mb-4 flex-1">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(product.rating)
                    ? 'fill-[#FBBF24] text-[#FBBF24]'
                    : 'text-[#404050]'
                }
              />
            ))}
          </div>
          <span className="text-[#A0A0B0] text-sm">({product.reviewCount})</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
          <motion.button
            onClick={handleAddToCart}
            className="p-3 bg-[#FF006E] hover:bg-[#FF006E]/80 text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>

      {/* Toast Notification */}
      {showNotification && (
        <motion.div
          className="fixed bottom-8 right-8 bg-[#00D4FF] text-[#1A1A2E] px-6 py-3 rounded-lg font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          Ajouté au panier!
        </motion.div>
      )}
    </motion.div>
  );
}
