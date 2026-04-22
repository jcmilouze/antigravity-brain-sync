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
      <label className="text-white font-semibold block mb-4">Matériau:</label>
      <div className="flex flex-col gap-3">
        {materials.map(material => (
          <motion.button
            key={material.id}
            onClick={() => onSelect(material.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selected === material.id
                ? 'border-[#00D4FF] bg-[rgba(0,212,255,0.1)]'
                : 'border-[rgba(124,58,237,0.3)] hover:border-[#00D4FF]'
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ x: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">{material.name}</div>
                <div className="text-[#A0A0B0] text-sm">{material.description}</div>
              </div>
              {material.priceAddon ? (
                material.priceAddon > 0 && (
                  <div className="text-[#FBBF24] font-semibold">
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
