'use client';

import { useFilterStore } from '@/lib/store';
import { SidebarFilters } from '@/components/SidebarFilters';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/mockData';
import { motion } from 'framer-motion';

export default function CatalogPage() {
  const {
    selectedMaterials,
    selectedColors,
    selectedCompatibility,
    priceRange,
    resetFilters,
  } = useFilterStore();

  // Filter products based on active filters
  const filteredProducts = PRODUCTS.filter(product => {
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Material filter
    if (selectedMaterials.length > 0) {
      const hasSelectedMaterial = product.materials.some(m =>
        selectedMaterials.includes(m.id)
      );
      if (!hasSelectedMaterial) return false;
    }

    // Color filter
    if (selectedColors.length > 0) {
      const hasSelectedColor = product.colors.some(c =>
        selectedColors.includes(c.hex)
      );
      if (!hasSelectedColor) return false;
    }

    // Compatibility filter
    if (selectedCompatibility.length > 0) {
      const hasCompatibility = product.compatibility.some(c =>
        selectedCompatibility.includes(c)
      );
      if (!hasCompatibility) return false;
    }

    return true;
  });

  const hasActiveFilters =
    selectedMaterials.length > 0 ||
    selectedColors.length > 0 ||
    selectedCompatibility.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 150;

  return (
    <main className="bg-background min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-on-background mb-2">
            Catalogue
          </h1>
          <p className="text-on-surface-variant">
            Explorez nos produits de haute qualité pour l'impression 3D professionnelle
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3">
            <div className="sticky top-20">
              <SidebarFilters />
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-on-surface">
                  <span className="font-semibold text-on-background">
                    {filteredProducts.length}
                  </span>{' '}
                  produit{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>

              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={resetFilters}
                  className="text-sm font-medium text-primary hover:text-primary-dark transition-colors underline"
                >
                  Réinitialiser les filtres
                </motion.button>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <p className="text-lg text-on-surface-variant mb-4">
                  Aucun produit ne correspond à vos critères
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
