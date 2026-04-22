'use client';

import { useState } from 'react';
import { PRODUCTS, STITCH_COLORS, MATERIALS_LIST } from '@/lib/mockData';
import { ColorPicker } from './ColorPicker';
import { MaterialSelector } from './MaterialSelector';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Suspense } from 'react';
import { ConfiguratorScene } from './3D/ConfiguratorScene';
import { motion } from 'framer-motion';

export function Configurator3D() {
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const [selectedColor, setSelectedColor] = useState(STITCH_COLORS[0].hex);
  const [selectedMaterial, setSelectedMaterial] = useState('pla');
  const [addedNotif, setAddedNotif] = useState(false);

  const product = PRODUCTS.find(p => p.id === selectedProductId)!;
  const material = MATERIALS_LIST.find(m => m.id === selectedMaterial)!;
  const totalPrice = product.price + (material.priceAddon || 0);

  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: selectedProductId,
      quantity: 1,
      selectedColor,
      selectedMaterial,
    });
    setAddedNotif(true);
    setTimeout(() => setAddedNotif(false), 2000);
  };

  return (
    <section className="section bg-background">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4 text-primary">
          Personnalisez Votre Produit
        </h2>
        <p className="text-on-surface-variant text-lg">
          Explorez les possibilités avec notre configurateur 3D
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 3D Preview */}
        <motion.div
          className="h-96 rounded-lg card overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Suspense fallback={<div className="w-full h-full bg-surface-container-highest" />}>
            <ConfiguratorScene color={selectedColor} />
          </Suspense>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Product Selector */}
          <div>
            <label className="text-on-surface font-semibold block mb-4">Produit:</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full p-3 rounded-sm bg-surface-container border border-outline-variant text-on-surface focus:outline-none focus:border-primary"
            >
              {PRODUCTS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Color Picker */}
          <ColorPicker
            colors={product.colors}
            selected={selectedColor}
            onSelect={setSelectedColor}
          />

          {/* Material Selector */}
          <MaterialSelector
            materials={product.materials}
            selected={selectedMaterial}
            onSelect={setSelectedMaterial}
          />

          {/* Price & CTA */}
          <div className="border-t border-outline-variant pt-8 mt-auto">
            <div className="mb-6">
              <span className="text-on-surface-variant text-sm">Prix total:</span>
              <div className="text-4xl font-bold text-primary">
                {formatPrice(totalPrice)}
              </div>
            </div>

            <motion.button
              onClick={handleAddToCart}
              className="btn-primary w-full text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ajouter au panier
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      {addedNotif && (
        <motion.div
          className="fixed bottom-8 right-8 bg-primary text-on-surface px-6 py-3 rounded-sm font-semibold z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          Ajouté au panier!
        </motion.div>
      )}
    </section>
  );
}
