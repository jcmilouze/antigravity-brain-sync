'use client';

import { Product } from '@/lib/types';
import { motion } from 'framer-motion';
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
      className="card p-4 h-full flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden mb-3">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="img-grayscale w-full h-full object-cover rounded-sm"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {product.stock > 0 && (
          <span className="badge-in-stock absolute top-2 right-2">In Stock</span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 right-2 bg-outline text-on-surface-variant px-2 py-1 rounded-sm text-xs uppercase">Out of Stock</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col space-y-3">
        <h3 className="font-semibold text-on-surface text-sm">{product.name}</h3>
        <p className="text-on-surface-variant text-xs flex-1">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined material-symbols-sm text-primary">star</span>
          <span className="text-sm text-on-surface-variant">{product.rating} ({product.reviewCount})</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="text-lg font-bold text-on-surface">${formatPrice(product.price)}</span>
          <motion.button
            onClick={handleAddToCart}
            className="btn-primary flex-1 text-xs py-2 flex items-center justify-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-symbols-outlined material-symbols-sm">shopping_cart</span>
            Add
          </motion.button>
        </div>
      </div>

      {/* Toast Notification */}
      {showNotification && (
        <motion.div
          className="fixed bottom-8 right-8 bg-primary text-on-surface px-6 py-3 rounded-sm font-semibold z-50"
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
