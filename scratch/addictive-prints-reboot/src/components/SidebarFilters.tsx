'use client';

import { useFilterStore } from '@/lib/store';
import { motion } from 'framer-motion';

export function SidebarFilters() {
  const {
    selectedMaterials,
    toggleMaterial,
    selectedCompatibility,
    toggleCompatibility,
    priceRange,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  const categories = ['Ponçage', 'Aspiration', 'Essentiels'];
  const compatibilityOptions = [
    'Windows',
    'macOS',
    'Professional',
    'Home',
    '3D Printers',
    'CNC',
    'Laser',
    'Hobby',
    'Industrial',
    'Workshop',
  ];
  const materialOptions = ['PLA', 'PETG', 'Nylon'];

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.aside
      className="card p-6 space-y-6 h-fit"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Categories */}
      <motion.div variants={itemVariants}>
        <h3 className="font-semibold text-on-surface mb-3 uppercase text-sm">Categories</h3>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 accent-primary"
                defaultChecked={false}
              />
              <span className="text-on-surface-variant text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Compatibility */}
      <motion.div variants={itemVariants}>
        <h3 className="font-semibold text-on-surface mb-3 uppercase text-sm">Compatibility</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {compatibilityOptions.map(compat => (
            <label
              key={compat}
              className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"
            >
              <input
                type="checkbox"
                className="w-4 h-4 accent-primary"
                checked={selectedCompatibility.includes(compat)}
                onChange={() => toggleCompatibility(compat)}
              />
              <span className="text-on-surface-variant text-sm">{compat}</span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Material */}
      <motion.div variants={itemVariants}>
        <h3 className="font-semibold text-on-surface mb-3 uppercase text-sm">Material</h3>
        <div className="space-y-2">
          {materialOptions.map(mat => (
            <label
              key={mat}
              className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"
            >
              <input
                type="checkbox"
                className="w-4 h-4 accent-primary"
                checked={selectedMaterials.includes(mat)}
                onChange={() => toggleMaterial(mat)}
              />
              <span className="text-on-surface-variant text-sm">{mat}</span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Price Range */}
      <motion.div variants={itemVariants}>
        <h3 className="font-semibold text-on-surface mb-3 uppercase text-sm">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-sm text-on-surface-variant">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </motion.div>

      {/* Reset Button */}
      <motion.button
        variants={itemVariants}
        onClick={resetFilters}
        className="btn-secondary w-full text-sm"
      >
        Reset Filters
      </motion.button>
    </motion.aside>
  );
}
