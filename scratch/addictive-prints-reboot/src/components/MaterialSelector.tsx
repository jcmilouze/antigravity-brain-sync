'use client';

import { Material } from '@/lib/types';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils';

interface MaterialSelectorProps {
  materials: Material[];
  selected: string;
  onSelect: (materialId: string) => void;
}

export function MaterialSelector({
  materials,
  selected,
  onSelect,
}: MaterialSelectorProps) {
  return (
    <div>
      <label className="text-on-surface font-semibold block mb-4">Matériau:</label>
      <div className="flex flex-col gap-3">
        {materials.map(material => (
          <motion.button
            key={material.id}
            onClick={() => onSelect(material.id)}
            className={`p-4 rounded-sm border-2 text-left transition-all ${
              selected === material.id
                ? 'border-primary bg-surface-container-high'
                : 'border-outline-variant hover:border-primary'
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ x: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-on-surface">{material.name}</div>
                <div className="text-on-surface-variant text-sm">{material.description}</div>
              </div>
              {material.priceAddon ? (
                material.priceAddon > 0 && (
                  <div className="text-primary font-semibold">
                    +{formatPrice(material.priceAddon)}
                  </div>
                )
              ) : null}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
